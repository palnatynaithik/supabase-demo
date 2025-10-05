// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabaseUrl = 'https://lbvhhioxniycjyrpcrnc.supabase.co' // replace with your Supabase URL
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidmhoaW94bml5Y2p5cnBjcm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODk0NzUsImV4cCI6MjA3NTE2NTQ3NX0.rOOdSAESpdD93Lc-SrjaVg3U3Xse295gL9kq8Y0iaR4' // replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey)
