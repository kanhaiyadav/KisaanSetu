import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImFacebook2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { FiPhoneCall } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { PiCarrotFill } from "react-icons/pi";
import { FaUserCheck } from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { Camera } from "lucide-react";
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import FarmerProfileForm from '@/components/Modals/UserProfileEditForm';

const Profile = () => {

    const { logout, currentUser } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState<any>(null);
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState<string | null>(null);
    const [bannerImage, setBannerImage] = React.useState<string | null>(null);
    const profileInputRef = React.useRef<HTMLInputElement>(null);
    const bannerInputRef = React.useRef<HTMLInputElement>(null);

    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                    setProfileImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('image', file);
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/uploadAvatar?email=${currentUser?.email}`
                , formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
        }
    };

    const handleBannerImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                    setBannerImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('image', file);
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/uploadBanner?email=${currentUser?.email}`
                , formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
        }
    };

    const handleProfileClick = () => {
        profileInputRef.current?.click();
    };

    const handleBannerClick = () => {
        bannerInputRef.current?.click();
    };

    React.useEffect(() => {

        const getUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users?email=${currentUser?.email}`);
                const userData = response.data.data.userData;
                console.log("User Data:", userData);
                if (userData.avatar.length > 0) {
                    setProfileImage(userData.avatar);
                }
                if (userData.banner.length > 0) {
                    setBannerImage(userData.banner);
                }
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            finally {
                setIsLoading(false);
            }
        }

        if (currentUser) {
            getUserData();
        } else {
            navigate('/signin');
        }

    }, []);

    return (
        <div className='flex-1 w-full p-[30px] px-[100px]'>
            <div className='w-full h-full flex gap-[100px]'>
                <div className='w-[300px] flex flex-col items-center gap-[30px] py-[20px] rounded-3xl'>
                    <div
                        className={`bg-primary/10 ${profileImage || isLoading ? 'shadow-sm' : 'border-2 border-dashed border-primary'} rounded-full w-[220px] h-[220px] flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors relative overflow-hidden`}
                        onClick={handleProfileClick}
                    >
                        {
                            isLoading ? (
                                <Skeleton circle={true} className='w-full h-full' />
                            ) : profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className='w-full h-full object-cover rounded-full'
                                />
                            ) : (
                                <img src="/placeholder.png" alt="" className='w-[100px] h-[100px] opacity-60' />
                            )}
                        <input
                            ref={profileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className='w-full flex flex-col gap-[20px] p-[10px]'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-2xl text-gray-700 font-semibold'>{currentUser?.displayName}</h1>
                                <h2 className='text-sm text-gray-600'>{currentUser?.email}</h2>
                            </div>
                            <div className='bg-white rounded-full px-4 py-2 shadow-sm'>
                                4.5 <span className='text-lg text-yellow-500'>★</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-2 text-gray-600'>
                                <FiPhoneCall className='text-lg' />
                                <span>+123 456 7890</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-600'>
                                <LuMapPin className='text-lg' />
                                <span>123 Main St, City, Country</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-600'>
                                <LuCalendarDays className='text-lg' />
                                <span>Joined on {currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'Unknown'}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-fit'>
                            <ImFacebook2 className='text-2xl text-[#1877F2]' />
                            <FaXTwitter className='text-2xl' />
                            <FaYoutube className='text-3xl text-[#FF0000]' />
                        </div>
                        <div className='flex gap-4'>
                            <Button className='w-full'>
                                Subscribe
                            </Button>
                            <Button className='w-full'>
                                Share
                            </Button>
                        </div>
                        <FarmerProfileForm />
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-[30px]'>
                    <div
                        className={`bg-primary/10  ${bannerImage || isLoading ? 'shadow-sm' : 'border-2 border-dashed border-primary'} rounded-3xl w-full h-[250px] flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors relative overflow-hidden`}
                        onClick={handleBannerClick}
                    >
                        {
                            isLoading ? (
                                <Skeleton circle={false} className='w-full h-full' />
                            ) : bannerImage ? (
                                <img
                                    src={bannerImage}
                                    alt="Banner"
                                    className='w-full h-full object-cover rounded-3xl'
                                />
                            ) : (
                                <img src="/placeholder.png" alt="" className='w-[100px] h-[100px] opacity-60' />
                            )}
                        <input
                            ref={bannerInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleBannerImageChange}
                            className="hidden"
                        />
                    </div>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="products">Products</TabsTrigger>
                            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="account">Account</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className='w-full mt-4 flex flex-col gap-[20px] items-center'>

                            <div className='flex items-center justify-between w-full gap-[20px]'>
                                <div className='flex-1 p-[20px] bg-white rounded-lg shadow-sm flex flex-col items-center gap-1'>
                                    <div className='bg-primary/10 p-4 rounded-full'>
                                        <FaUserCheck className='text-3xl text-primary' />
                                    </div>
                                    <h4>Subscribers</h4>
                                    <span className='text-4xl font-bold'>150K</span>
                                </div>
                                <div className='flex-1 p-[20px] bg-white rounded-lg shadow-sm flex flex-col items-center gap-1'>
                                    <div className='bg-primary/10 p-4 rounded-full'>
                                        <PiCarrotFill className='text-3xl text-primary' />
                                    </div>
                                    <h4>Products</h4>
                                    <span className='text-4xl font-bold'>230</span>
                                </div>
                                <div className='flex-1 p-[20px] bg-white rounded-lg shadow-sm flex flex-col items-center gap-1'>
                                    <div className='bg-primary/10 p-4 rounded-full'>
                                        <BsClipboard2CheckFill className='text-3xl text-primary' />
                                    </div>
                                    <h4>Orders Completed</h4>
                                    <span className='text-4xl font-bold'>51k</span>
                                </div>
                                <div className='flex-1 p-[20px] bg-white rounded-lg shadow-sm flex flex-col items-center gap-1'>
                                    <div className='bg-primary/10 p-4 rounded-full'>
                                        <BsGraphUpArrow className='text-3xl text-primary' />
                                    </div>
                                    <h4>Success Rate</h4>
                                    <span className='text-4xl font-bold'>95%</span>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm">
                                <p className={expanded ? "" : "line-clamp-3"}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ea alias fugiat laboriosam quasi excepturi, fugit atque omnis dolore hic, natus vero quisquam nihil eum incidunt quae aut quaerat illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa rem eum sed laboriosam eos nulla deserunt vitae facere, illo dolor tenetur corrupti deleniti quas, tempore ex cupiditate, iusto autem dolorem?
                                </p>
                                {!expanded && (
                                    <button
                                        className="text-blue-600 inline-block hover:text-blue-800"
                                        onClick={() => setExpanded(true)}
                                    >
                                        Show more
                                    </button>
                                )}
                                {expanded && (
                                    <button
                                        className="text-blue-600 inline-block hover:text-blue-800"
                                        onClick={() => setExpanded(false)}
                                    >
                                        Show less
                                    </button>
                                )}
                                <div className='flex  gap-[100px] mt-4'>
                                    <div>
                                        <h3 className='font-bold text-black'>Farm Details</h3>
                                        <ul className='ml-5 list-disc'>
                                            <li><span className='font-semibold text-black'>Location:</span> 123 Farm Lane, Springfield</li>
                                            <li><span className='font-semibold text-black'>Size:</span> 50 acres</li>
                                            <li><span className='font-semibold text-black'>Type:</span> Organic</li>
                                            <li><span className='font-semibold text-black'>Primary crops:</span> Onion, Potato, Tomato</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-black'>Languages</h3>
                                        <ul className='ml-5 list-disc'>
                                            <li>Hindi</li>
                                            <li>Bengla</li>
                                            <li>English</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="account">
                            <Button
                                variant={'destructive'}
                                onClick={() => {
                                    logout();
                                    navigate('/farmer');
                                }}
                            >
                                Log out
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Profile