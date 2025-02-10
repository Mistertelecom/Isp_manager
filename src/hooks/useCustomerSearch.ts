import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface Customer {
  id: number;
  name: string;
  cpfCnpj: string;
  email: string | null;
  phone: string;
  status: string;
}

export const useCustomerSearch = () => {
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const searchCustomers = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch(`/api/customers/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching customers:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  return {
    searchResults,
    loading,
    searchCustomers,
  };
};
