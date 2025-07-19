import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Business {
  id: string;
  name: string;
  type: 'clinic' | 'salon' | 'spa';
  email: string;
  phone?: string;
  address?: string;
  owner_id: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface StaffMember {
  id: string;
  business_id: string;
  name: string;
  email?: string;
  phone?: string;
  specialties: string[];
  working_hours: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  duration_minutes: number;
  price: number;
  category?: string;
  is_active: boolean;
  created_at: string;
}

export interface Customer {
  id: string;
  business_id: string;
  name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  notes?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  business_id: string;
  customer_id: string;
  staff_id?: string;
  service_id?: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  customer?: Customer;
  staff?: StaffMember;
  service?: Service;
}

// Auth functions
export const signUp = async (email: string, password: string, businessData: {
  name: string;
  type: 'clinic' | 'salon' | 'spa';
  phone?: string;
  address?: string;
}) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    // Create business record
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .insert({
        name: businessData.name,
        type: businessData.type,
        email: email,
        phone: businessData.phone,
        address: businessData.address,
        owner_id: authData.user.id,
      })
      .select()
      .single();

    if (businessError) throw businessError;

    // Initialize business data (staff and services)
    const { error: initError } = await supabase.rpc('initialize_business_data', {
      business_id_param: business.id,
      business_type_param: businessData.type,
    });

    if (initError) throw initError;

    return { user: authData.user, business };
  }

  return { user: null, business: null };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    // Get business data
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_id', data.user.id)
      .single();

    if (businessError) throw businessError;

    return { user: data.user, business };
  }

  return { user: null, business: null };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Business functions
export const getCurrentBusiness = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: business, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  if (error) throw error;
  return business;
};

// Staff functions
export const getStaffMembers = async (businessId: string) => {
  const { data, error } = await supabase
    .from('staff_members')
    .select('*')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('name');

  if (error) throw error;
  return data;
};

// Service functions
export const getServices = async (businessId: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

// Customer functions
export const getCustomers = async (businessId: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .order('name');

  if (error) throw error;
  return data;
};

export const createCustomer = async (customerData: Omit<Customer, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('customers')
    .insert(customerData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Appointment functions
export const getAppointments = async (businessId: string, date?: string) => {
  let query = supabase
    .from('appointments')
    .select(`
      *,
      customer:customers(*),
      staff:staff_members(*),
      service:services(*)
    `)
    .eq('business_id', businessId);

  if (date) {
    query = query.eq('appointment_date', date);
  }

  const { data, error } = await query.order('appointment_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) throw error;
  return data;
};

export const createAppointment = async (appointmentData: {
  business_id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  staff_id?: string;
  service_id?: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  notes?: string;
}) => {
  // First, create or find customer
  let customer;
  
  if (appointmentData.customer_email) {
    // Try to find existing customer
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', appointmentData.business_id)
      .eq('email', appointmentData.customer_email)
      .single();

    if (existingCustomer) {
      customer = existingCustomer;
    } else {
      // Create new customer
      customer = await createCustomer({
        business_id: appointmentData.business_id,
        name: appointmentData.customer_name,
        email: appointmentData.customer_email,
        phone: appointmentData.customer_phone,
      });
    }
  } else {
    // Create customer without email
    customer = await createCustomer({
      business_id: appointmentData.business_id,
      name: appointmentData.customer_name,
      phone: appointmentData.customer_phone,
    });
  }

  // Create appointment
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      business_id: appointmentData.business_id,
      customer_id: customer.id,
      staff_id: appointmentData.staff_id,
      service_id: appointmentData.service_id,
      appointment_date: appointmentData.appointment_date,
      start_time: appointmentData.start_time,
      end_time: appointmentData.end_time,
      notes: appointmentData.notes,
      status: 'scheduled',
    })
    .select(`
      *,
      customer:customers(*),
      staff:staff_members(*),
      service:services(*)
    `)
    .single();

  if (error) throw error;
  return data;
};

export const updateAppointmentStatus = async (appointmentId: string, status: Appointment['status']) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Public booking functions (for customer booking page)
export const getPublicBusinesses = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('id, name, type, address')
    .order('name');

  if (error) throw error;
  return data;
};

export const getPublicServices = async (businessId: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

export const getPublicStaff = async (businessId: string) => {
  const { data, error } = await supabase
    .from('staff_members')
    .select('id, name, specialties')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('name');

  if (error) throw error;
  return data;
};