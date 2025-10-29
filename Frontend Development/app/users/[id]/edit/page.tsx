"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface User {
  user_id: number
  name: string
  email_id: string
  ph_no: string
}

const API_BASE_URL = "http://localhost:8080"

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<User | null>(null)

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/user/${userId}`)
      if (!response.ok) throw new Error("Failed to fetch user")
      const data = await response.json()
      setFormData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setError(null)

    // Validation
    if (!formData.name.trim() || !formData.email_id.trim() || !formData.ph_no.trim()) {
      setError("All fields are required")
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update user")
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Loading user...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (!formData) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive mb-4">{error || "User not found"}</p>
              <Link href="/">
                <Button>Back to Users</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>Update user information</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="email_id" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email_id"
                  name="email_id"
                  type="email"
                  value={formData.email_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="ph_no" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input id="ph_no" name="ph_no" type="tel" value={formData.ph_no} onChange={handleChange} required />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Updating..." : "Update User"}
                </Button>
                <Link href="/">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
