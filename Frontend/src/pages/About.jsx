import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function AboutPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-200">
            <Card className="w-full max-w-3xl mx-auto bg-white overflow-hidden shadow-xl rounded-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
                    <CardTitle className="text-3xl font-bold">About Cervical Cancer Classification</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed text-center">
                        Our application leverages advanced deep learning models to assist in the early detection of
                        <span className="font-semibold text-blue-600"> cervical cancer</span> using colposcopy images.
                    </p>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center">
                        This tool helps recognize potential abnormalities efficiently and accurately, but it is
                        <span className="font-bold text-red-500">not</span> a replacement for professional medical diagnosis.
                    </p>

                    {/* Why Choose Us Section */}
                    <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Why Choose Us?</h2>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600 text-xl">✔</span>
                                <span>AI-powered accuracy</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600 text-xl">✔</span>
                                <span>Real-time image analysis</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600 text-xl">✔</span>
                                <span>Secure & private</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600 text-xl">✔</span>
                                <span>Trusted by professionals</span>
                            </div>
                        </div>
                    </div>

                    {/* FAQs Section */}
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">FAQs</h2>
                        <Accordion type="single" collapsible>
                            {[
                                { question: "How does the classification work?", answer: "The application uses a deep learning model trained on colposcopy images to classify different stages of cervical cancer." },
                                { question: "Is this application a substitute for medical advice?", answer: "No, this tool is for informational purposes only. Always consult a medical professional." },
                                { question: "How accurate is the prediction?", answer: "The accuracy depends on the quality of the image and training data. It should not replace medical tests." },
                                { question: "Is my uploaded image stored or shared?", answer: "No, we prioritize privacy. Images are only used for real-time analysis." }
                            ].map((faq, index) => (
                                <AccordionItem key={index} value={`faq${index}`} className="border-b border-gray-300">
                                    <AccordionTrigger className="text-gray-800 font-medium hover:text-blue-600 transition-all duration-200">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}