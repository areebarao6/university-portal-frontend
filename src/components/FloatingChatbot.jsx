import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useLocation } from "react-router-dom"

export default function FloatingChatbot() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // Define where chatbot is allowed
    const allowedRoutes = ["/dashboard", "/courses", "/fees"]

    if (!isAuthenticated || !allowedRoutes.includes(location.pathname)) {
      if (window.botpressWebChat) {
        window.botpressWebChat.destroy() // Remove bot UI if exists
        window.botpressLoaded = false
      }
      return
    }

    if (window.botpressLoaded) return
    window.botpressLoaded = true

    const script1 = document.createElement("script")
    script1.src = "https://cdn.botpress.cloud/webchat/v3.5/inject.js"
    script1.async = true

    script1.onload = () => {
      const script2 = document.createElement("script")
      script2.src = "https://files.bpcontent.cloud/2025/04/29/23/20250429230957-S6GQBPNE.js"
      script2.async = true
      document.body.appendChild(script2)
    }

    document.body.appendChild(script1)

    return () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.destroy()
        window.botpressLoaded = false
      }
    }
  }, [isAuthenticated, location.pathname])

  return null
}




