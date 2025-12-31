"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { UserProfile } from "@/lib/types"

interface EditProfileDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditProfileDialog({ open, onOpenChange }: EditProfileDialogProps) {
    const { userProfile, updateUserProfile } = useAppStore()
    const [formData, setFormData] = useState<UserProfile>(userProfile)
    const [currentSkill, setCurrentSkill] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateUserProfile(formData)
        onOpenChange(false)
    }

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentSkill.trim()) {
            e.preventDefault()
            if (!formData.skills.includes(currentSkill.trim())) {
                setFormData({ ...formData, skills: [...formData.skills, currentSkill.trim()] })
            }
            setCurrentSkill("")
        }
    }

    const removeSkill = (skill: string) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] glass">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your professional details accessible to others.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Professional Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Product Manager"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. New York, NY"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Bio / About</Label>
                        <Textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Timezone</Label>
                            <Input
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Availability</Label>
                            <Input
                                value={formData.availability}
                                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Skills (Press Enter)</Label>
                        <div className="flex bg-background border border-input rounded-md px-3 py-2 flex-wrap gap-2 focus-within:ring-2 ring-primary/20">
                            {formData.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="gap-1">
                                    {skill}
                                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                                </Badge>
                            ))}
                            <input
                                className="bg-transparent outline-none flex-1 min-w-[80px] text-sm"
                                placeholder="Add skill..."
                                value={currentSkill}
                                onChange={e => setCurrentSkill(e.target.value)}
                                onKeyDown={handleAddSkill}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
