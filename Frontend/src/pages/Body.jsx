import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
const Body = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body;


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Content() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <section className="text-center max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900">
                    Skin Cancer Classification
                </h1>
                <p className="text-gray-600 text-lg mt-4">
                    Upload an image and get instant insights using AI-powered skin cancer detection.
                </p>
                <Button className="mt-6">Get Started</Button>
            </section>

            <section className="mt-12 grid gap-6 md:grid-cols-3">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">AI-Powered</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Uses deep learning models for accurate skin disease classification.
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Easy to Use</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Just upload an image and get instant results within seconds.
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Early Detection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Helps in identifying potential skin conditions at an early stage.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
