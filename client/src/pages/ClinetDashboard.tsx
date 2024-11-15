import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Briefcase, DollarSign, Clock, Users, Star, ChevronRight, Plus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'


// Mock data for the dashboard
const activeProjects = [
  { id: 1, title: "E-commerce Website Redesign", freelancer: "Alice Johnson", progress: 75, dueDate: "2024-04-15" },
  { id: 2, title: "Mobile App Development", freelancer: "Bob Smith", progress: 40, dueDate: "2024-05-20" },
  { id: 3, title: "Content Marketing Strategy", freelancer: "Carol Williams", progress: 90, dueDate: "2024-03-31" },
  { id: 4, title: "Web3 ", freelancer: "Rom sane ", progress: 90, dueDate: "2024-03-31" },
  { id: 5 , title: "CMS ", freelancer: "Jatin ", progress: 90, dueDate: "2024-03-31" },
]

const recentTransactions = [
  { id: 1, description: "Payment for E-commerce Website", amount: 2500, date: "2024-03-15" },
  { id: 2, description: "Deposit for Mobile App Project", amount: 1000, date: "2024-03-10" },
  { id: 3, description: "Content Marketing Monthly Fee", amount: 800, date: "2024-03-01" },
]

const spendingData = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3000 },
  { month: 'Mar', amount: 5000 },
  { month: 'Apr', amount: 4500 },
  { month: 'May', amount: 3500 },
  { month: 'Jun', amount: 4800 },
]

export default function ClientDashboard() {
  const {id} = useParams();
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <Link to={`/post-jobs/${id}`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Post a New Job
          </Button>
          </Link>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Briefcase} title="Active Projects" value="3" />
              <StatCard icon={DollarSign} title="Total Spent" value="$8,300" />
              <StatCard icon={Clock} title="Avg. Completion Time" value="14 days" />
              <StatCard icon={Users} title="Hired Freelancers" value="5" />
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={spendingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-10">
                    {activeProjects.map((project) => (
                      <li key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-gray-500">{project.freelancer}</p>
                        </div>
                        <div className="text-right">
                          <Link to="/milestone">
                          <Button>Next  </Button>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {activeProjects.map((project) => (
                    <li key={project.id}>
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <li key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <p className="font-medium">${transaction.amount}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freelancers">
            <Card>
              <CardHeader>
                <CardTitle>Your Hired Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Davis'].map((freelancer, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={`/placeholder.svg?text=${freelancer.split(' ').map(n => n[0]).join('')}`} alt={freelancer} />
                          <AvatarFallback>{freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{freelancer}</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-500">4.{8 - index} ({20 - index * 2} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Profile <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <Icon className="h-8 w-8 text-indigo-600 mb-2" />
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

function ProjectCard({ project }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-500">{project.freelancer}</p>
          </div>
          <Badge variant={project.progress >= 90 ? "success" : project.progress >= 50 ? "warning" : "default"}>
            {project.progress}% Complete
          </Badge>
        </div>
        <Progress value={project.progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>Due: {project.dueDate}</span>
          <Link to="#" className="text-indigo-600 hover:underline">View Details</Link>
        </div>
      </CardContent>
    </Card>
  )
}