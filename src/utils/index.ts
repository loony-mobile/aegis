export const handleError = (e: any, setState: any) => {
    if (e.code === 'ERR_NETWORK') {
        setState(
          'Network error: Please check your internet connection or server status.',
        );
      }
      if (e.response && e.response.data) {
        setState(e.response.data);
      }
};
