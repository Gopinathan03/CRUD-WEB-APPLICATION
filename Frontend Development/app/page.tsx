"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"

interface User {
  user_id: number
  name: string
  email_id: string
  ph_no: string
}

const API_BASE_URL = "http://localhost:8080"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/allusers`)
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete user")
      setUsers(users.filter((u) => u.user_id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user")
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage all users in your system</p>
          </div>
          <Link href="/users/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Loading users...</p>
            </CardContent>
          </Card>
        )}

        {/* Users Grid */}
        {!loading && users.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.user_id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="text-sm">{user.email_id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Phone:</span> {user.ph_no}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">ID:</span> {user.user_id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/users/${user.user_id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.user_id)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && !error && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground mb-4">No users found</p>
              <div className="flex justify-center">
                <Link href="/users/create">
                  <Button>Create First User</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
