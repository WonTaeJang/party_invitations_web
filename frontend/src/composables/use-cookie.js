import { useCookies } from "vue3-cookies"

export const useCookie = () => {
  const { cookies } = useCookies()

  const hasCookie = (id) => {
    if (cookies.get(id)) {
      return true
    }

    return false
  }

  const setCookie = (id) => {
    cookies.set(id, true, "1d")
  }

  return {
    hasCookie,
    setCookie,
  }
} 