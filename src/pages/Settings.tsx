import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, Database, Shield, Globe, Users, Mail } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and administrative options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">System Name</label>
              <Input defaultValue="CivicAdmin Dashboard" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">City/Municipality</label>
              <Input defaultValue="Metro City" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Zone</label>
              <Select defaultValue="utc-5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Maintenance Mode</div>
                <div className="text-xs text-muted-foreground">Restrict access during system updates</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Email Alerts</div>
                <div className="text-xs text-muted-foreground">Send email notifications for critical issues</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">SMS Notifications</div>
                <div className="text-xs text-muted-foreground">SMS alerts for urgent escalations</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Deadline Reminders</div>
                <div className="text-xs text-muted-foreground">Automatic reminders 24h before deadlines</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notification Email</label>
              <Input type="email" defaultValue="admin@metrocity.gov" />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Allow Self Registration</div>
                <div className="text-xs text-muted-foreground">Let users create accounts independently</div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Require Email Verification</div>
                <div className="text-xs text-muted-foreground">Users must verify email before access</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Manage User Roles
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground">Require 2FA for admin accounts</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">IP Whitelisting</div>
                <div className="text-xs text-muted-foreground">Restrict access to specific IP addresses</div>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password Policy</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="medium">Medium (8+ chars, numbers, symbols)</SelectItem>
                  <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              View Security Logs
            </Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database & Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-lg font-bold">2.4GB</div>
                <div className="text-xs text-muted-foreground">Database Size</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-lg font-bold">847MB</div>
                <div className="text-xs text-muted-foreground">Attachments</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Automatic Backups</div>
                <div className="text-xs text-muted-foreground">Daily backup at 2:00 AM</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Retention (days)</label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Database className="w-4 h-4 mr-2" />
                Backup Now
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Restore
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Maps API Key</label>
              <Input placeholder="Enter Google Maps or Mapbox API key" type="password" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">SMS Provider</label>
              <Select defaultValue="twilio">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="aws">AWS SNS</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">API Access</div>
                <div className="text-xs text-muted-foreground">Allow third-party API integration</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Test Email Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}