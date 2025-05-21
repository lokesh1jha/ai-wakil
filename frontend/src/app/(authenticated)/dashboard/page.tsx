import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your recently uploaded legal documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for document list */}
              <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Summaries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Summaries</CardTitle>
            <CardDescription>AI-generated summaries of your documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for summaries */}
              <p className="text-sm text-muted-foreground">No summaries available</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Queries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Queries</CardTitle>
            <CardDescription>Your recent conversations with AI Wakil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for queries */}
              <p className="text-sm text-muted-foreground">No recent queries</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 