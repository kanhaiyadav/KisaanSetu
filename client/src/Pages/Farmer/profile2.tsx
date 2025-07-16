import React, { useState } from 'react';
import {
    FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaEdit, FaCamera,
    FaLeaf, FaTractor, FaShoppingCart, FaHeart, FaStar, FaCalendarAlt,
    FaChartLine, FaAward, FaUsers, FaBoxOpen, FaHandshake, FaWhatsapp,
    FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGlobe, FaShieldAlt,
    FaBell, FaEye, FaCog, FaHistory, FaComments, FaTruck, FaMoneyBillWave
} from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [userType] = useState('farmer'); // 'farmer' or 'consumer'

    // Mock user data
    const userData = {
        name: "Rajesh Kumar",
        profileImage: "/api/placeholder/150/150",
        coverImage: "/api/placeholder/800/300",
        userType: "farmer",
        location: "Ludhiana, Punjab",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@email.com",
        joinDate: "January 2023",
        bio: "Organic farming enthusiast with 15+ years of experience. Specializing in wheat, rice, and seasonal vegetables. Committed to sustainable agriculture practices.",
        verified: true,
        rating: 4.8,
        totalReviews: 124,
        farmSize: "25 acres",
        primaryCrops: ["Wheat", "Rice", "Tomatoes", "Onions"],
        certifications: ["Organic Certified", "FPO Member", "Sustainable Farming"],
        languages: ["Hindi", "Punjabi", "English"],
        socialMedia: {
            whatsapp: "+91 98765 43210",
            facebook: "rajesh.farmer",
            instagram: "@rajesh_organic_farm"
        }
    };

    const stats = {
        totalSales: "₹12,50,000",
        totalOrders: 1250,
        repeatCustomers: 89,
        avgRating: 4.8,
        completionRate: 98,
        responseTime: "2 hours"
    };

    const recentActivity = [
        { type: "sale", description: "Sold 500kg wheat to Mumbai buyer", date: "2 days ago", amount: "₹15,000" },
        { type: "review", description: "Received 5-star review from Priya Sharma", date: "3 days ago" },
        { type: "inventory", description: "Added fresh tomatoes to inventory", date: "5 days ago" },
        { type: "order", description: "Delivered order to Delhi customer", date: "1 week ago", amount: "₹8,500" }
    ];

    const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ComponentType<{ size?: number }> }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === id
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );

    return (
        <div className="min-h-dvh bg-gradient-to-br from-green-50 to-blue-50">
            {/* Cover Image & Profile Header */}
            <div className="relative">
                <div className="h-64 bg-gradient-to-r from-green-400 to-blue-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-all">
                        <FaCamera size={16} />
                    </button>
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="relative">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                            <AvatarImage src={userData.profileImage} alt={userData.name} />
                            <AvatarFallback className="bg-green-500 text-white text-3xl font-bold">
                                {userData.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all">
                            <FaCamera size={12} />
                        </button>
                    </div>

                    <div className="mb-4 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{userData.name}</h1>
                            {userData.verified && (
                                <Badge className="bg-blue-500 text-white">
                                    <FaShieldAlt className="mr-1" size={12} />
                                    Verified
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex items-center gap-1">
                                <FaMapMarkerAlt size={14} />
                                <span>{userData.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaStar size={14} />
                                <span>{userData.rating} ({userData.totalReviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-8 pt-20 pb-8">
                <div className="max-w-7xl mx-auto">
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mb-8">
                        <Button variant="outline" className="flex items-center gap-2">
                            <FaEdit size={16} />
                            Edit Profile
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <FaCog size={16} />
                            Settings
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                            <FaWhatsapp size={16} />
                            Contact
                        </Button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        <TabButton id="overview" label="Overview" icon={FaUser} />
                        <TabButton id="stats" label="Statistics" icon={FaChartLine} />
                        <TabButton id="products" label="Products" icon={FaBoxOpen} />
                        <TabButton id="reviews" label="Reviews" icon={FaStar} />
                        <TabButton id="activity" label="Activity" icon={FaHistory} />
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {activeTab === 'overview' && (
                                <>
                                    {/* About Section */}
                                    <Card className="shadow-lg border-0">
                                        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                                            <CardTitle className="flex items-center gap-2">
                                                <FaUser />
                                                About {userData.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <p className="text-gray-700 mb-4">{userData.bio}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-2">Farm Details</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <FaTractor className="text-green-600" />
                                                            <span>Farm Size: {userData.farmSize}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaLeaf className="text-green-600" />
                                                            <span>Primary Crops: {userData.primaryCrops.join(', ')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {userData.languages.map(lang => (
                                                            <Badge key={lang} variant="secondary">{lang}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Certifications */}
                                    <Card className="shadow-lg border-0">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-gray-800">
                                                <FaAward className="text-yellow-500" />
                                                Certifications & Achievements
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {userData.certifications.map(cert => (
                                                    <div key={cert} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <FaAward className="text-yellow-600" />
                                                            <span className="font-semibold text-gray-800">{cert}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )}

                            {activeTab === 'stats' && (
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                                        <CardTitle className="flex items-center gap-2">
                                            <FaChartLine />
                                            Performance Statistics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">{stats.totalSales}</div>
                                                <div className="text-sm text-gray-600">Total Sales</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
                                                <div className="text-sm text-gray-600">Total Orders</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-purple-600">{stats.repeatCustomers}</div>
                                                <div className="text-sm text-gray-600">Repeat Customers</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-600">{stats.avgRating}</div>
                                                <div className="text-sm text-gray-600">Average Rating</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-red-600">{stats.completionRate}%</div>
                                                <div className="text-sm text-gray-600">Completion Rate</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-indigo-600">{stats.responseTime}</div>
                                                <div className="text-sm text-gray-600">Response Time</div>
                                            </div>
                                        </div>
                                        <Separator className="my-6" />
                                        <div>
                                            <h4 className="font-semibold mb-4">Performance Metrics</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span>Order Completion Rate</span>
                                                        <span>98%</span>
                                                    </div>
                                                    <Progress value={98} className="h-2" />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span>Customer Satisfaction</span>
                                                        <span>96%</span>
                                                    </div>
                                                    <Progress value={96} className="h-2" />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span>Quality Rating</span>
                                                        <span>94%</span>
                                                    </div>
                                                    <Progress value={94} className="h-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeTab === 'activity' && (
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                                        <CardTitle className="flex items-center gap-2">
                                            <FaHistory />
                                            Recent Activity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            {recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        {activity.type === 'sale' && <FaMoneyBillWave className="text-green-600" />}
                                                        {activity.type === 'review' && <FaStar className="text-yellow-600" />}
                                                        {activity.type === 'inventory' && <FaBoxOpen className="text-blue-600" />}
                                                        {activity.type === 'order' && <FaTruck className="text-purple-600" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-800 font-medium">{activity.description}</p>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                            <span>{activity.date}</span>
                                                            {activity.amount && <span className="text-green-600 font-semibold">{activity.amount}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Contact Information */}
                            <Card className="shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-gray-800">
                                        <FaPhone className="text-green-600" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FaPhone className="text-gray-500" />
                                        <span className="text-gray-700">{userData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaEnvelope className="text-gray-500" />
                                        <span className="text-gray-700">{userData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaMapMarkerAlt className="text-gray-500" />
                                        <span className="text-gray-700">{userData.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaCalendarAlt className="text-gray-500" />
                                        <span className="text-gray-700">Joined {userData.joinDate}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Media */}
                            <Card className="shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-gray-800">
                                        <FaGlobe className="text-blue-600" />
                                        Social Media
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-3">
                                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                            <FaWhatsapp />
                                        </Button>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            <FaFacebook />
                                        </Button>
                                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                                            <FaInstagram />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-gray-800">
                                        <FaChartLine className="text-green-600" />
                                        Quick Stats
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Profile Views</span>
                                        <span className="font-semibold">1,234</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Followers</span>
                                        <span className="font-semibold">456</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Following</span>
                                        <span className="font-semibold">89</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Success Rate</span>
                                        <span className="font-semibold text-green-600">98%</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;