import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Custom hook that runs an effect when the language changes
 * @param callback The function to run when language changes
 * @param dependencies Additional dependencies for the effect
 */
export function useLanguageEffect(
  callback: () => void | Promise<void>,
  dependencies: React.DependencyList = []
) {
  const { i18n } = useTranslation();

  useEffect(() => {
    callback();
  }, [i18n.language, ...dependencies, callback]);
}

export default useLanguageEffect;
