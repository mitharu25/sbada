import { useState } from 'react';
import { Button } from '@/components/uiNew/button';
import { Input } from '@/components/uiNew/input';
import { Label } from '@/components/uiNew/label';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/uiNew/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/uiNew/tabs';
import { toast } from 'sonner';
import { BarChart3, Loader2 } from 'lucide-react';
import { Head, router } from '@inertiajs/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        router.post(
            '/login',
            {
                email,
                password,
            },
            {
                onSuccess: () => {
                    toast.success('Welcome back!');
                },

                onError: () => {
                    toast.error('Invalid email or password');
                },

                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        router.post(
            '/register',
            {
                name: fullName,
                name_company: companyName,
                phone_number: phoneNumber,
                email,
                password,
                address,
            },
            {
                onSuccess: () => {
                    toast.success('Account created successfully!');
                },

                onError: (errors) => {
                    console.log(errors);

                    toast.error('Failed to create account');
                },

                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Login" />

            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mb-4 flex items-center justify-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                            <BarChart3 className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">SBADA</h1>
                    <p className="mt-2 text-gray-600">
                        Smart Business Analytics Dashboard Automation
                    </p>
                </div>

                <Card className="border-gray-200 shadow-lg">
                    <Tabs defaultValue="signin" className="w-full">
                        <CardHeader className="pb-0">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signin">
                                    Sign In
                                </TabsTrigger>
                                <TabsTrigger value="signup">
                                    Create Account
                                </TabsTrigger>
                            </TabsList>
                        </CardHeader>

                        <TabsContent value="signin">
                            <form onSubmit={handleSignIn}>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-signin">
                                            Email
                                        </Label>
                                        <Input
                                            id="email-signin"
                                            type="email"
                                            placeholder="you@email.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-signin">
                                            Password
                                        </Label>
                                        <Input
                                            id="password-signin"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        type="submit"
                                        className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form onSubmit={handleSignUp}>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullname">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={fullName}
                                            onChange={(e) =>
                                                setFullName(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="Company Name">
                                            Company Name
                                        </Label>
                                        <Input
                                            id="name_company"
                                            type="text"
                                            placeholder="Bakery John"
                                            value={companyName}
                                            onChange={(e) =>
                                                setCompanyName(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="Address Company">
                                            Address Company
                                        </Label>
                                        <Input
                                            id="address_company"
                                            type="text"
                                            placeholder="123 Bakery Street"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="Phone Number">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone_number"
                                            type="text"
                                            placeholder="08..."
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-signup">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@email.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-signup">
                                            Password
                                        </Label>
                                        <Input
                                            id="password-signup"
                                            type="password"
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            minLength={6}
                                            className="h-11"
                                        />
                                        <p className="text-xs text-gray-500">
                                            Must be at least 6 characters
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        type="submit"
                                        className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </TabsContent>
                    </Tabs>
                </Card>

                <p className="text-center text-sm text-gray-500">
                    Demo credentials: admin@gmail.com / 123
                </p>
            </div>
        </div>
    );
}
