import Head from 'next/head';
import { Fragment } from 'react';

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highlu active React meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    );

}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// } 

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address:  meetup.address,
                description: meetup.description,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    };
}

export default HomePage;