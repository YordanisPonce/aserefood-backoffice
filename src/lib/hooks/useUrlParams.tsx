import { useRouter, useSearchParams } from 'next/navigation';

const useUrlParams = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (
    _params: UrlParamsType | UrlParamsType[],
    scroll?: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (Array.isArray(_params)) {
      _params.forEach((_param) => {
        Object.keys(_param).forEach((key) => {
          const _d = _param[key];
          if (_d.action === 'delete') {
            params.delete(key);
          } else if (_d.action === 'add') {
            params.append(key, _d.value.toString());
          } else if (_d.action === 'set') {
            params.set(key, _d.value.toString());
          }
        });
      });
    } else {
      Object.keys(_params).forEach((key) => {
        const _d = _params[key];
        if (_d.action === 'delete') {
          params.delete(key);
        } else if (_d.action === 'add') {
          params.append(key, _d.value.toString());
        } else if (_d.action === 'set') {
          params.set(key, _d.value.toString());
        }
      });
    }

    replace(`?${params.toString()}`, { scroll: Boolean(scroll) });
  };

  const getUrlParams = () => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  return { updateSearchParams, getUrlParams };
};

export type UrlParamsType = Record<
  string,
  { action: 'add' | 'delete' | 'set'; value: string | number }
>;

export default useUrlParams;
