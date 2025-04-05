"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const TestSupabase = () => {
  const [message, setMessage] = useState<string>('Testing connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test authentication
        const { data: authData, error: authError } = await supabase.auth.getSession();
        if (authError) throw authError;
        
        // Test database connection
        const { data: dbData, error: dbError } = await supabase
          .from('_tables')
          .select('*')
          .limit(1);
        
        if (dbError) throw dbError;
        
        setMessage('✅ Connection successful!');
        console.log('Auth data:', authData);
        console.log('Database data:', dbData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setMessage('❌ Connection failed');
        console.error('Error:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className="p-4 bg-gray-100 rounded">
        <p className="text-lg">{message}</p>
        {error && (
          <p className="text-red-500 mt-2">
            Error: {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TestSupabase; 