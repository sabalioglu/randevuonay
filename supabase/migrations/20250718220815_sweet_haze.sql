/*
  # Sample Data for Testing

  1. Sample Businesses
    - Bright Smile Dental Clinic
    - Luxe Beauty Salon
    - Zen Wellness Spa

  2. Sample Staff, Services, Customers, and Appointments
    - Realistic data for each business type
    - Various appointment statuses and times
*/

-- Insert sample businesses (these will be created when users register)
-- This is just for reference - actual businesses will be created through registration

-- Sample services for different business types
-- These can be used as templates when businesses are created

-- Dental Clinic Services Template
INSERT INTO services (business_id, name, description, duration_minutes, price, category) VALUES
-- Note: business_id will be set when actual businesses are created
-- This is template data for reference
('00000000-0000-0000-0000-000000000000', 'Dental Cleaning', 'Professional teeth cleaning and polishing', 60, 120.00, 'Preventive'),
('00000000-0000-0000-0000-000000000000', 'Regular Checkup', 'Comprehensive oral examination', 30, 80.00, 'Preventive'),
('00000000-0000-0000-0000-000000000000', 'Teeth Whitening', 'Professional teeth whitening treatment', 90, 200.00, 'Cosmetic'),
('00000000-0000-0000-0000-000000000000', 'Dental Filling', 'Tooth restoration with composite filling', 45, 150.00, 'Restorative'),
('00000000-0000-0000-0000-000000000000', 'Root Canal', 'Root canal therapy treatment', 90, 400.00, 'Endodontic');

-- Remove the template data (it was just for reference)
DELETE FROM services WHERE business_id = '00000000-0000-0000-0000-000000000000';

-- Create a function to initialize business data
CREATE OR REPLACE FUNCTION initialize_business_data(
  business_id_param uuid,
  business_type_param business_type
)
RETURNS void AS $$
BEGIN
  -- Insert default staff members based on business type
  IF business_type_param = 'clinic' THEN
    INSERT INTO staff_members (business_id, name, email, specialties, working_hours) VALUES
    (business_id_param, 'Dr. Sarah Johnson', 'sarah@clinic.com', ARRAY['General Dentistry', 'Cosmetic'], '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "15:00"}}'),
    (business_id_param, 'Dr. Michael Smith', 'michael@clinic.com', ARRAY['Oral Surgery', 'Implants'], '{"monday": {"start": "10:00", "end": "18:00"}, "tuesday": {"start": "10:00", "end": "18:00"}, "wednesday": {"start": "10:00", "end": "18:00"}, "thursday": {"start": "10:00", "end": "18:00"}}'),
    (business_id_param, 'Dr. Emily Brown', 'emily@clinic.com', ARRAY['Pediatric', 'Orthodontics'], '{"monday": {"start": "08:00", "end": "16:00"}, "tuesday": {"start": "08:00", "end": "16:00"}, "wednesday": {"start": "08:00", "end": "16:00"}, "friday": {"start": "08:00", "end": "16:00"}}');
    
    INSERT INTO services (business_id, name, description, duration_minutes, price, category) VALUES
    (business_id_param, 'Dental Cleaning', 'Professional teeth cleaning and polishing', 60, 120.00, 'Preventive'),
    (business_id_param, 'Regular Checkup', 'Comprehensive oral examination', 30, 80.00, 'Preventive'),
    (business_id_param, 'Teeth Whitening', 'Professional teeth whitening treatment', 90, 200.00, 'Cosmetic'),
    (business_id_param, 'Dental Filling', 'Tooth restoration with composite filling', 45, 150.00, 'Restorative'),
    (business_id_param, 'Root Canal', 'Root canal therapy treatment', 90, 400.00, 'Endodontic');
    
  ELSIF business_type_param = 'salon' THEN
    INSERT INTO staff_members (business_id, name, email, specialties, working_hours) VALUES
    (business_id_param, 'Maria Rodriguez', 'maria@salon.com', ARRAY['Hair Styling', 'Color'], '{"tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "19:00"}, "saturday": {"start": "08:00", "end": "17:00"}}'),
    (business_id_param, 'Jessica Chen', 'jessica@salon.com', ARRAY['Nails', 'Skincare'], '{"monday": {"start": "10:00", "end": "19:00"}, "tuesday": {"start": "10:00", "end": "19:00"}, "wednesday": {"start": "10:00", "end": "19:00"}, "thursday": {"start": "10:00", "end": "19:00"}, "saturday": {"start": "09:00", "end": "18:00"}}'),
    (business_id_param, 'Alex Thompson', 'alex@salon.com', ARRAY['Cuts', 'Treatments'], '{"monday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "17:00"}, "saturday": {"start": "08:00", "end": "16:00"}}');
    
    INSERT INTO services (business_id, name, description, duration_minutes, price, category) VALUES
    (business_id_param, 'Haircut & Style', 'Professional haircut and styling', 60, 65.00, 'Hair'),
    (business_id_param, 'Hair Color', 'Full hair coloring service', 120, 120.00, 'Hair'),
    (business_id_param, 'Manicure', 'Complete nail care and polish', 45, 35.00, 'Nails'),
    (business_id_param, 'Pedicure', 'Foot care and nail treatment', 60, 45.00, 'Nails'),
    (business_id_param, 'Deep Cleansing Facial', 'Professional facial treatment', 75, 85.00, 'Skincare');
    
  ELSIF business_type_param = 'spa' THEN
    INSERT INTO staff_members (business_id, name, email, specialties, working_hours) VALUES
    (business_id_param, 'David Kim', 'david@spa.com', ARRAY['Massage Therapy', 'Sports'], '{"monday": {"start": "10:00", "end": "19:00"}, "tuesday": {"start": "10:00", "end": "19:00"}, "wednesday": {"start": "10:00", "end": "19:00"}, "thursday": {"start": "10:00", "end": "19:00"}, "friday": {"start": "10:00", "end": "19:00"}}'),
    (business_id_param, 'Anna Williams', 'anna@spa.com', ARRAY['Wellness', 'Aromatherapy'], '{"tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}, "saturday": {"start": "09:00", "end": "17:00"}}'),
    (business_id_param, 'Carlos Martinez', 'carlos@spa.com', ARRAY['Deep Tissue', 'Relaxation'], '{"monday": {"start": "11:00", "end": "20:00"}, "wednesday": {"start": "11:00", "end": "20:00"}, "thursday": {"start": "11:00", "end": "20:00"}, "friday": {"start": "11:00", "end": "20:00"}, "saturday": {"start": "10:00", "end": "18:00"}}');
    
    INSERT INTO services (business_id, name, description, duration_minutes, price, category) VALUES
    (business_id_param, 'Swedish Massage', 'Relaxing full body massage', 60, 100.00, 'Massage'),
    (business_id_param, 'Hot Stone Therapy', 'Therapeutic hot stone massage', 90, 140.00, 'Massage'),
    (business_id_param, 'Aromatherapy Session', 'Essential oil therapy treatment', 75, 120.00, 'Wellness'),
    (business_id_param, 'Detox Body Wrap', 'Full body detoxification treatment', 60, 110.00, 'Body Treatment'),
    (business_id_param, 'Deep Tissue Massage', 'Therapeutic deep tissue work', 75, 130.00, 'Massage');
  END IF;
END;
$$ LANGUAGE plpgsql;