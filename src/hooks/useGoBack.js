import { useNavigate } from 'react-router-dom';

/**
 * Returns a goBack function that navigates back in history if a previous
 * in-app page exists, otherwise navigates to the given fallback path.
 */
const useGoBack = (fallback = '/') => {
  const navigate = useNavigate();

  const goBack = () => {
    // React Router sets key to 'default' on the initial page load (direct URL).
    // A different key means the user navigated here from within the app.
    const hasPreviousRoute =
      window.history.state?.key && window.history.state.key !== 'default';

    if (hasPreviousRoute) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return goBack;
};

export default useGoBack;
