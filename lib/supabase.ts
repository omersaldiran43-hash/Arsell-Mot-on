import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aezzrdtmgvwkkuowgmpn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlenpyZHRtZ3Z3a2t1b3dnbXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMzE5MDEsImV4cCI6MjA4NjgwNzkwMX0.m5a0KJwDbYjQLaOUSXF1mcN0Qdsl3ltFkUUVutcCYMw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);