export const handleError = (e: any, setState: any) => {
  console.log(e.response);
    if (e.code === 'ERR_NETWORK') {
        setState(
          'Network error: Please check your internet connection or server status.',
        );
      }
      if (e.response && e.response.data) {
        setState(e.response.data);
      }
};

export const validateEmail = (_email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(_email);
};
