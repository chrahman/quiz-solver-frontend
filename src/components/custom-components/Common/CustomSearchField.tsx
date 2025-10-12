import { IconSearch } from '@tabler/icons-react';
import CustomFormInput from './CustomFormInput';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  className?: string;
  placeholder?: string;
};
const CustomSearchField = ({ searchValue, setSearchValue, className, placeholder }: Props) => {
  const [query, setQuery] = useState(searchValue);
  const [debounceQuery] = useDebounce(query, 500);

  useEffect(() => {
    if (searchValue !== query) setQuery(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(debounceQuery);
  }, [debounceQuery]);

  return (
    <CustomFormInput
      placeholder={placeholder ?? 'Search'}
      className={className}
      classNames={{ input: 'text-xs' }}
      onValueChange={(value) => setQuery(value)}
      value={query}
      startContent={<IconSearch size={16} className="opacity-60" />}
    />
  );
};

export default CustomSearchField;
