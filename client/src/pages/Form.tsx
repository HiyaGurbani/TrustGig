import { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function JobCreate() {
  const naviagator = useNavigate();
  const {id} = useParams();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobType, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state

    try {
      // Prepare job data
      const jobData = {
        title: jobTitle,
        company: companyName,
        location,
        salary: salaryRange,
        type: jobType,
        skills,
        description,
      };

      // Make POST request to create job
     
      const response = await axios.post("http://localhost:7000/api/client/dashboard/client/create", jobData);
  

      alert('Job created successfully!');
      console.log(response.data); // Log response for debugging
      naviagator(`/dashboard/client/${id}`)

      // Optionally reset form fields or navigate to another page
    } catch (error) {
      console.error("Error creating job:", error);
      // alert(Error: `${error.response?.data?.error || error.message}`)  ;
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6 text-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Create a New Job</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-xl">
              <div className="space-y-2 rounded-xl">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g. Senior React Developer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
              </div>
              
              <div className="space-y-2 rounded-xl">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="e.g. TechCorp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              
              <div className="space-y-2 rounded-xl">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. Remote, New York, NY" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g. $100k - $150k" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select onValueChange={setJobType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent className='text-black bg-white rounded-xl'>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="secondary" className="pl-2 pr-1 py-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Add Skill Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSkill} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Job Description Section */}
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Describe the job role, responsibilities, and requirements" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>

            </form>
          </CardContent>

          {/* Footer with Buttons */}
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Creating Job...' : 'Create Job'}
            </Button>
          </CardFooter>

        </Card>
      </div>
    </div>
  );
}