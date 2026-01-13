import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  GithubLogo, 
  LinkedinLogo, 
  Envelope, 
  SpinnerGap, 
  CheckCircle,
  Warning,
  Briefcase,
  X
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ProfileSubmissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ContributionType = 'contribute_now' | 'register_for_future' | ''

const API_URL = import.meta.env.PROD 
  ? 'https://api-landing.expl.one' 
  : 'http://localhost:3003'

export function ProfileSubmissionModal({ open, onOpenChange }: ProfileSubmissionModalProps) {
  const [workFields, setWorkFields] = useState('')
  const [contributionType, setContributionType] = useState<ContributionType>('')
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Work fields validation
    if (!workFields.trim()) {
      newErrors.workFields = 'This field is required'
    } else if (workFields.trim().length < 3) {
      newErrors.workFields = 'Must be at least 3 characters'
    } else if (workFields.trim().length > 100) {
      newErrors.workFields = 'Must be 100 characters or less'
    }

    // Contribution type validation
    if (!contributionType) {
      newErrors.contributionType = 'Please select an option'
    }

    // At least one profile link required
    if (!githubUrl.trim() && !linkedinUrl.trim()) {
      newErrors.profiles = 'At least one profile link is required'
    }

    // GitHub URL validation - flexible, case insensitive
    if (githubUrl.trim() && !githubUrl.toLowerCase().includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL'
    }

    // LinkedIn URL validation - flexible, case insensitive
    if (linkedinUrl.trim() && !linkedinUrl.toLowerCase().includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL'
    }

    // Email validation - required
    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required'
    } else if (!contactEmail.includes('@')) {
      newErrors.contactEmail = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log('Form validation failed:', errors)
      return
    }

    setIsSubmitting(true)
    console.log('Submitting application to:', API_URL)

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          work_fields: workFields.trim(),
          contribution_type: contributionType,
          github_url: githubUrl.trim(),
          linkedin_url: linkedinUrl.trim(),
          contact_email: contactEmail.trim(),
        }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit profile')
      }

      // Success
      toast.success('Profile Submitted!', {
        description: "Thanks for your interest.",
        icon: <CheckCircle size={20} weight="fill" className="text-green-500" />,
      })

      // Reset form and close modal
      resetForm()
      onOpenChange(false)
    } catch (error: any) {
      toast.error('Submission Failed', {
        description: error.message || 'Please try again later.',
        icon: <Warning size={20} weight="fill" className="text-red-500" />,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setWorkFields('')
    setContributionType('')
    setGithubUrl('')
    setLinkedinUrl('')
    setContactEmail('')
    setErrors({})
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto overflow-x-hidden bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="flex-row items-center justify-between gap-2">
          <DialogTitle className="text-lg sm:text-2xl font-bold text-foreground flex items-center gap-2 whitespace-nowrap">
            <Briefcase size={24} className="text-primary flex-shrink-0 sm:w-7 sm:h-7" weight="duotone" />
            Submit Your Profile
          </DialogTitle>
          <DialogClose className="flex-shrink-0 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <X size={22} weight="bold" className="text-foreground" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6 px-6 py-4 overflow-y-auto">
          <DialogDescription className="text-muted-foreground text-sm sm:text-base text-left">
            Register your interest in being part of EXPL ONE. We'll review your profile and reach out when opportunities arise.
          </DialogDescription>

          {/* 1. Work Fields */}
          <div className="space-y-2">
            <Label htmlFor="workFields" className="text-base font-medium text-foreground">
              The field(s) I'd like to work in are: <span className="text-primary">*</span>
            </Label>
            <Input
              id="workFields"
              placeholder="e.g., Backend Development, AI/ML, Marketing..."
              value={workFields}
              onChange={(e) => setWorkFields(e.target.value)}
              maxLength={100}
              className={`bg-background/50 border-border/50 focus:border-primary ${
                errors.workFields ? 'border-destructive' : ''
              }`}
            />
            <div className="flex justify-between items-center">
              {errors.workFields && (
                <p className="text-sm text-destructive">{errors.workFields}</p>
              )}
              <p className={`text-xs text-muted-foreground ml-auto ${workFields.length > 90 ? 'text-yellow-500' : ''}`}>
                {workFields.length}/100
              </p>
            </div>
          </div>

          {/* 2. Contribution Type Dropdown */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-foreground">
              My intention: <span className="text-primary">*</span>
            </Label>
            <Select value={contributionType} onValueChange={(value) => setContributionType(value as ContributionType)}>
              <SelectTrigger className={`w-full bg-background/50 border-border/50 focus:border-primary h-auto min-h-[44px] rounded-lg ${
                errors.contributionType ? 'border-destructive' : ''
              }`}>
                <span className="truncate text-left">
                  {contributionType === 'contribute_now' 
                    ? 'I have a clear vision, valuable connections...'
                    : contributionType === 'register_for_future'
                    ? "I'd like to register my profile..."
                    : <span className="text-muted-foreground">Select your intention...</span>
                  }
                </span>
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/20 max-w-[calc(100vw-3rem)] sm:max-w-[508px] p-1">
                <SelectItem 
                  value="contribute_now" 
                  className="py-3"
                >
                  <span className="block text-sm leading-relaxed whitespace-normal">
                    I have a clear vision, valuable connections, potential investor opportunities, or skills that can improve certain aspects, and I'd like to contribute now, even if there are no open positions.
                  </span>
                </SelectItem>
                <SelectItem 
                  value="register_for_future" 
                  className="py-3"
                >
                  <span className="block text-sm leading-relaxed whitespace-normal">
                    I'd like to register my profile in the EXPL ONE database to be considered in the future when opportunities become available.
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.contributionType && (
              <p className="text-sm text-destructive">{errors.contributionType}</p>
            )}
          </div>

          {/* 3. Contact Links Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-base font-medium text-foreground">
                Profile Links <span className="text-primary">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                At least one profile link is required (GitHub or LinkedIn)
              </p>
            </div>

            {/* GitHub */}
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <GithubLogo size={18} weight="fill" />
                GitHub Profile
              </Label>
              <Input
                id="github"
                placeholder="https://github.com/yourusername"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={`bg-background/50 border-border/50 focus:border-primary ${
                  errors.githubUrl ? 'border-destructive' : ''
                }`}
              />
              {errors.githubUrl && (
                <p className="text-sm text-destructive">{errors.githubUrl}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <LinkedinLogo size={18} weight="fill" />
                LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourusername"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={`bg-background/50 border-border/50 focus:border-primary ${
                  errors.linkedinUrl ? 'border-destructive' : ''
                }`}
              />
              {errors.linkedinUrl && (
                <p className="text-sm text-destructive">{errors.linkedinUrl}</p>
              )}
            </div>

            {errors.profiles && (
              <p className="text-sm text-destructive">{errors.profiles}</p>
            )}

            {/* Contact Email */}
            <div className="space-y-2 pt-2 border-t border-border/30">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Envelope size={18} weight="fill" />
                Contact Email <span className="text-primary">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className={`bg-background/50 border-border/50 focus:border-primary ${
                  errors.contactEmail ? 'border-destructive' : ''
                }`}
              />
              <p className="text-xs text-muted-foreground">
                We'll use this email to contact you if needed.
              </p>
              {errors.contactEmail && (
                <p className="text-sm text-destructive">{errors.contactEmail}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <SpinnerGap size={18} className="animate-spin" />
                  Submitting...
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Submit Profile
                  <span>→</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
