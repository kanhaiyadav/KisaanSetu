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
import FarmerProfileForm from '@/components/Modals/UserProfileEditModal';
import { Skeleton } from '@/components/ui/skeleton';

const StatCard = ({ icon: Icon, title, value, loading }: { icon: React.ElementType, title: string, value: string, loading: boolean }) => {
    return (
        <>
            {
                loading ? (
                    <Skeleton className='flex-1 h-[174px] rounded-lg shadow-sm ' />
                ) : (
                    <div className='flex-1 p-[20px] bg-white rounded-lg shadow-sm flex flex-col items-center gap-1'>
                        <div className='bg-primary/10 p-4 rounded-full'>
                            <Icon className='text-3xl text-primary' />
                        </div>
                        <h4>{title}</h4>
                        <span className='text-4xl font-bold'>{value}</span>
                    </div>

                )
            }
        </>
    )
}

const Profile = () => {

    const { logout, currentUser } = useAuth();
    const [userLoading, setUserLoading] = React.useState(true);
    console.log("Current User:", currentUser);
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
        setUserLoading(true);
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
                setUserLoading(false);
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
                        className={`bg-primary/10 ${profileImage || userLoading ? 'shadow-sm' : 'border-2 border-dashed border-primary'} rounded-full w-[220px] h-[220px] flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors relative overflow-hidden`}
                        onClick={handleProfileClick}
                    >
                        {
                            userLoading ? (
                                <Skeleton className='w-full h-full rounded-full' />
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
                    {
                        userLoading ? (
                            <div className='w-full flex flex-col gap-[20px] p-[10px]'>
                                <Skeleton className='w-full h-[70px] rounded-lg shadow-sm' />
                                <div className='flex flex-col gap-4'>
                                    <Skeleton className='w-full h-[30px] rounded-lg shadow-sm' />
                                    <Skeleton className='w-full h-[30px] rounded-lg shadow-sm' />
                                    <Skeleton className='w-full h-[30px] rounded-lg shadow-sm' />
                                </div>
                                <div className='flex items-center gap-4 w-fit'>
                                    {
                                        Array.from({ length: 4 }, (_, index) => (
                                            <Skeleton className='w-[30px] h-[30px] rounded-full' />
                                        ))
                                    }
                                </div>
                                <div className='flex gap-4'>
                                    <Skeleton className='flex-1 h-[40px] rounded-lg shadow-sm' />
                                    <Skeleton className='flex-1 h-[40px] rounded-lg shadow-sm' />
                                </div>
                                <Skeleton className='w-full h-[40px] rounded-lg shadow-sm mt-[-10px]'/>
                            </div>
                        ) :
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
                                    {
                                        user?.phone &&
                                        <div className='flex items-center gap-2 text-gray-600'>
                                            <FiPhoneCall className='text-lg' />
                                            <span>{user?.phone}</span>
                                        </div>
                                    }
                                    {
                                        user?.address &&
                                        <div className='flex items-center gap-2 text-gray-600'>
                                            <LuMapPin className='text-lg' />
                                            <span>{user?.address?.streetAddress}</span>
                                        </div>
                                    }
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
                                    {
                                        user?.socialMediaLinks?.map((link: any) => {
                                            switch (link.platform) {
                                                case 'facebook':
                                                    return (
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                            <ImFacebook2 key={link.id} className='text-2xl text-blue-600 cursor-pointer' onClick={() => window.open(link.url, '_blank')} />;
                                                        </a>
                                                    )
                                                case 'twitter':
                                                    return (
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                            < FaXTwitter key={link.id} className='text-2xl text-blue-400 cursor-pointer' onClick={() => window.open(link.url, '_blank')} />
                                                        </a>
                                                    )
                                                case 'youtube':
                                                    return (
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                            < FaYoutube key={link.id} className='text-2xl text-red-600 cursor-pointer' onClick={() => window.open(link.url, '_blank')} />
                                                        </a>
                                                    )
                                                default:
                                                    return null;
                                            }
                                        })
                                    }
                                </div>
                                <div className='flex gap-4'>
                                    <Button variant={'secondary'} className='w-full'>
                                        Subscribe
                                    </Button>
                                    <Button variant={'secondary'} className='w-full'>
                                        Share
                                    </Button>
                                </div>
                                <FarmerProfileForm user={user} />
                            </div>
                    }
                </div>
                <div className='flex-1 flex flex-col gap-[30px]'>
                    <div
                        className={`bg-primary/10  ${bannerImage || userLoading ? 'shadow-sm' : 'border-2 border-dashed border-primary'} rounded-3xl w-full h-[250px] flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors relative overflow-hidden`}
                        onClick={handleBannerClick}
                    >
                        {
                            userLoading ? (
                                <Skeleton className='w-full h-full' />
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
                                <StatCard
                                    icon={PiCarrotFill}
                                    title="Products"
                                    value={user?.products?.length || '0'}
                                    loading={userLoading}
                                />
                                <StatCard
                                    icon={FaUserCheck}
                                    title="Subscribers"
                                    value={user?.subscribers?.length || '0'}
                                    loading={userLoading}
                                />
                                <StatCard
                                    icon={BsClipboard2CheckFill}
                                    title="Reviews"
                                    value={user?.reviews?.length || '0'}
                                    loading={userLoading}
                                />
                                <StatCard
                                    icon={BsGraphUpArrow}
                                    title="Growth Rate"
                                    value="5%"
                                    loading={userLoading}
                                />
                            </div>
                            {
                                user?.abbout || user?.farm?.size || user?.languages &&
                                <div className="bg-white p-5 rounded-lg shadow-sm w-full">
                                    {
                                        user?.about &&
                                        <>
                                            <p className={expanded ? "" : "line-clamp-3"}>
                                                {user?.about}
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
                                        </>
                                    }
                                    <div className='flex  gap-[100px] mt-4'>
                                        {
                                            user?.farm &&
                                            <div>
                                                <h3 className='font-bold text-black'>Farm Details</h3>
                                                <ul className='ml-5 list-disc'>
                                                    <li><span className='font-semibold text-black'>Location:</span>{user?.farm?.location}</li>
                                                    <li><span className='font-semibold text-black'>Size:</span> {user?.farm?.size} {user?.farm?.sizeUnit}</li>
                                                    <li><span className='font-semibold text-black'>Primary crops:</span>
                                                        {user?.farm?.primaryCrops?.map((crop: string, index: number) => {
                                                            if (index === user?.farm?.primaryCrops.length - 1) {
                                                                return <span key={index}>{crop}</span>
                                                            }
                                                            return <span key={index}>{crop}, </span>
                                                        })}
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                        {
                                            user?.languages &&
                                            <div>
                                                <h3 className='font-bold text-black'>Languages</h3>
                                                <ul className='ml-5 list-disc'>
                                                    {user?.languages?.map((lang: string, index: number) => (
                                                        <li key={index}>{lang}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                            {
                                userLoading && (
                                    <Skeleton className='bg-white p-5 rounded-lg shadow-sm w-full h-[130px]' />
                                )
                            }
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