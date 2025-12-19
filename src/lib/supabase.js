import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vlhetbzmjptqokzcvtdk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaGV0YnptanB0cW9remN2dGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDUxNTAsImV4cCI6MjA4MTcyMTE1MH0.jdZLzDJ1Ck4V3AK1iUdv299T1Siqa_mbFTbf8D0D9XE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
