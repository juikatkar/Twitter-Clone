"use client"

export default function BackToHomeButton() {
  function handleBack() {
    window.location.href = "/home"
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="text-sm font-medium text-blue-600 hover:underline"
    >
      ← Back to Home
    </button>
  )
}