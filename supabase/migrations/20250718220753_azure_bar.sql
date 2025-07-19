/*
  # Multi-tenant Appointment Scheduling System

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (enum: clinic, salon, spa)
      - `email` (text, unique)
      - `phone` (text)
      - `address` (text)
      - `owner_id` (uuid, references auth.users)
      - `settings` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `staff_members`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `specialties` (text array)
      - `working_hours` (jsonb)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `services`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `name` (text)
      - `description` (text)
      - `duration_minutes` (integer)
      - `price` (decimal)
      - `category` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `customers`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `date_of_birth` (date)
      - `notes` (text)
      - `created_at` (timestamp)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `customer_id` (uuid, references customers)
      - `staff_id` (uuid, references staff_members)
      - `service_id` (uuid, references services)
      - `appointment_date` (date)
      - `start_time` (time)
      - `end_time` (time)
      - `status` (enum: scheduled, confirmed, in_progress, completed, cancelled, no_show)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for business isolation
    - Ensure users can only access their own business data
*/

-- Create custom types
CREATE TYPE business_type AS ENUM ('clinic', 'salon', 'spa');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type business_type NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  address text,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Staff members table
CREATE TABLE IF NOT EXISTS staff_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  specialties text[] DEFAULT '{}',
  working_hours jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  duration_minutes integer NOT NULL DEFAULT 30,
  price decimal(10,2) NOT NULL DEFAULT 0,
  category text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  date_of_birth date,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  staff_id uuid REFERENCES staff_members(id) ON DELETE SET NULL,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status appointment_status DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for businesses
CREATE POLICY "Users can view their own business"
  ON businesses
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can update their own business"
  ON businesses
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can insert their own business"
  ON businesses
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

-- RLS Policies for staff_members
CREATE POLICY "Business owners can manage their staff"
  ON staff_members
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for services
CREATE POLICY "Business owners can manage their services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for customers
CREATE POLICY "Business owners can manage their customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for appointments
CREATE POLICY "Business owners can manage their appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_staff_members_business_id ON staff_members(business_id);
CREATE INDEX IF NOT EXISTS idx_services_business_id ON services(business_id);
CREATE INDEX IF NOT EXISTS idx_customers_business_id ON customers(business_id);
CREATE INDEX IF NOT EXISTS idx_appointments_business_id ON appointments(business_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_staff_date ON appointments(staff_id, appointment_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();