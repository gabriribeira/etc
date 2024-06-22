import React from 'react';
import TopBar from '../components/common/TopBar';
import BottomBar from '../components/common/BottomBar';
import Image from '../assets/imgs/etc/logo_salmon.webp'

const PrivacyPolicy = () => {
    return (
        <div>
            <TopBar />
            <div className="min-h-screen bg-white p-5">
                <div className="flex flex-col items-start pt-32">
                    <img src={Image} alt="et.cetera logo" className="h-5 mb-2" />
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                </div>
                <div className="text-left mt-8 space-y-6">
                    <p>This privacy policy will explain how et.cetera uses the personal data we collect from you when you use our website.</p>

                    <h2 className="text-2xl font-semibold">Topics</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>What data do we collect?</li>
                        <li>How do we collect your data?</li>
                        <li>How will we use your data?</li>
                        <li>How do we store your data?</li>
                        <li>Marketing</li>
                        <li>What are your data protection rights?</li>
                        <li>What are cookies?</li>
                        <li>How do we use cookies?</li>
                        <li>What types of cookies do we use?</li>
                        <li>How to manage your cookies</li>
                        <li>Changes to our privacy policy</li>
                        <li>How to contact us</li>
                        <li>How to contact the appropriate authorities</li>
                    </ul>

                    <h2 className="text-2xl font-semibold">What data do we collect?</h2>
                    <p>et.cetera collects the following data:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>First and last name;</li>
                        <li>Email;</li>
                        <li>Profile photo;</li>
                        <li>Language.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold">How do we collect your data?</h2>
                    <p>You directly provide et.cetera with most of the data we collect. We collect data and process data when you:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Register online;</li>
                        <li>Voluntarily complete a customer survey or provide feedback on any of our message boards or via email;</li>
                        <li>Use or view our website via your browser&apos;s cookies.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold">How will we use your data?</h2>
                    <p>et.cetera collects your data so that we can:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Manage your account;</li>
                        <li>Recommend you products.</li>
                    </ul>
                    <p>If you agree, et.cetera will share your data with our partner companies so that they may offer you their products and services. Our partners include:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Supermarkets.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold">How do we store your data?</h2>
                    <p>et.cetera stores your data in a secure database in a secure server.</p>
                    <p>et.cetera will keep your personal data (first and last name, username, email, password, photo) forever. When the account is deleted, the data will be deleted too.</p>

                    <h2 className="text-2xl font-semibold">Marketing</h2>
                    <p>et.cetera would like to send you information about products and services of ours that we think you might like, as well as those of our partner companies, such as:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Supermarkets</li>
                    </ul>
                    <p>If you have agreed to receive marketing, you may always opt out later. You have the right, at any time, to stop et.cetera from contacting you for marketing purposes or giving your data to partner companies.</p>
                    <p>If you no longer wish to be contacted for marketing purposes, please click here.</p>

                    <h2 className="text-2xl font-semibold">What are your data protection rights?</h2>
                    <p>et.cetera would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li><strong>The right to access</strong> - You have the right to request et.cetera for copies of your personal data. We may charge you a small fee for this service.</li>
                        <li><strong>The right to rectification</strong> - You have the right to request that et.cetera correct any information you believe is inaccurate. You also have the right to request et.cetera to complete information you believe is incomplete.</li>
                        <li><strong>The right to erasure</strong> - You have the right to request that et.cetera erase your personal data, under certain conditions.</li>
                        <li><strong>The right to restrict processing</strong> - You have the right to request that et.cetera restrict the processing of your personal data, under certain conditions.</li>
                        <li><strong>The right to object to processing</strong> - You have the right to object to et.cetera&apos;s processing of your personal data, under certain conditions.</li>
                        <li><strong>The right to data portability</strong> - You have the right to request that et.cetera transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>
                    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email: info@etc-app.com</p>
                    <p>Call us at: +351 234 370 348</p>
                    <p>Or write to us: Departamento de Comunicação e Arte da Universidade de Aveiro, Campus Universitário de Santiago, 3810-193 Aveiro, Portugal</p>

                    <h2 className="text-2xl font-semibold">What are cookies?</h2>
                    <p>Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our websites, we may collect information from you automatically through cookies or similar technology.</p>
                    <p>For further information, visit <a href="https://allaboutcookies.org" className="text-blue-500 underline">allaboutcookies.org</a></p>

                    <h2 className="text-2xl font-semibold">How do we use cookies?</h2>
                    <p>et.cetera uses cookies in a range of ways to improve your experience on our website, including:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Keeping you signed in;</li>
                        <li>Understanding how you use our app.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold">What type of cookies do we use?</h2>
                    <p>There are a few different types of cookies, however, our website uses:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li><strong>Functionality</strong> - et.cetera uses these cookies so that we recognize you on our website and remember your previously selected preferences. These could include what language you prefer and location you are in. Only third-party cookies are used.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold">How to manage cookies</h2>
                    <p>You can set your device not to accept cookies, and our app provides instructions on how to remove them. However, in some cases, some features of our app may not function properly as a result.</p>

                    <h2 className="text-2xl font-semibold">Privacy policies of other websites</h2>
                    <p>The et.cetera app contains links to other websites. Our privacy policy applies only to our app, so if you click on a link to another website, you should read their privacy policy.</p>

                    <h2 className="text-2xl font-semibold">Changes to our Privacy Policy</h2>
                    <p>et.cetera keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 20 June 2024.</p>

                    <h2 className="text-2xl font-semibold">How to contact the appropriate authority</h2>
                    <p>Should you wish to report a complaint or if you feel that et.cetera has not addressed your concern in a satisfactory manner, you may contact the Information Commissioner&apos;s Office.</p>
                    <p>Email: epd@ua.pt</p>
                    <p>Address: Campus Universitário de Santiago, 3810-193 Aveiro, Portugal</p>
                </div>
            </div>
            <BottomBar />
        </div>
    );

}

export default PrivacyPolicy;
