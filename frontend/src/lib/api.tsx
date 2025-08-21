// API configuration and service functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://safal-portfolio-backend.onrender.com"

class ApiService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Blog API methods
  async getBlogs() {
    return this.request("/api/blogs")
  }

  async getBlogBySlug(slug: string) {
    return this.request(`/api/blogs/${slug}`)
  }

  // Project API methods
  async getProjects() {
    return this.request("/api/projects")
  }

  // Contact API methods
  async submitContact(data: any) {
    return this.request("/api/contact/submit", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const apiService = new ApiService(API_BASE_URL)

// Type definitions
export interface Blog {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  createdAt: string
}
