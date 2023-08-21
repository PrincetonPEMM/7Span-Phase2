import StartWith from "@/app/components/StartWith";
import Funders from "@/assets/images/funders.png"
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
const img_path = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/`

export default async function page() {
    const about_people = await client.request(readItems("about_people", { fields: ["*.*.*"] }));
    const about_people_detail = await client.request(readItems("about_people_detail"));
    const team_with_image = []
    const team_without_image = []
    for(let i = 0; i < about_people_detail.length; i++) {
        if(about_people_detail[i].profile_image) {
            team_with_image.push(
                <Link href={`/about/people/${about_people_detail[i].slug}`}>
                    <div className="text-center w-72 p-1">
                        <img className="rounded-full w-72 h-72 object-cover py-3 px-3 mx-auto" src={`${img_path}${about_people_detail[i].profile_image}`} />
                        <h3 className="font-bold text-center w-full line-clamp-1 text-xl tracking-tight">{`${about_people_detail[i].first_name ?? ''} ${about_people_detail[i].last_name ?? ''}`}</h3>
                        <p className="text-center line-clamp-3">{about_people_detail[i].designation ?? ''}</p>
                        {/* <span>{t.date}</span> */}
                    </div>
                </Link>
            )
        }
        else {
            team_without_image.push(
                <Link href={`/about/people/${about_people_detail[i].slug}`}>
                    <div className="text-center w-72 py-4">
                        <h3 className="font-bold text-center w-full text-xl tracking-tight">{`${about_people_detail[i].first_name ?? ''} ${about_people_detail[i].last_name ?? ''}`}</h3>
                        <p className="text-center">{about_people_detail[i].designation ?? ''}</p>
                        {/* <span className="italic text-sm">{t.date}</span> */}
                    </div>
                </Link>
            )
        }
    }
    const team = [
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            img: Funders,
            name: "Prof. Wendy Laura Belcher",
            designation: "Project Director and Principal Investigator",
            date: "2018-present"
        },
        {
            name: "Solomon Gebreyes",
            designation: "Cataloger",
            date: "2018-present"
        },
        {
            name: "Vitagrazia Pisani",
            designation: "Cataloger",
            date: "2018-present"
        },
        {
            name: "Bret Windhauser",
            designation: "Research Assistant",
            date: "2018-present"
        },
        {
            name: "Shawn Benjamin",
            designation: "Translation Associate",
            date: "2018-present"
        },
        {
            name: "Hanni Mekonnen",
            designation: "Geography Research Assistant",
            date: "2018-present"
        },
        {
            name: "Dr. Jean Bauer",
            designation: "Digital Humanities Strategic Planning and Data Designer",
            date: "2018-present"
        },
        {
            name: "Dr. Rebecca Sutton Koeser",
            designation: "Digital Humanities Technical Advisor",
            date: "2018-present"
        },
        {
            name: "Prof. Steve Delamarter",
            designation: "Ethiopic Manuscript Digital Humanities Consultant",
            date: "2018-present"
        },
        {
            name: "Prof. Getatchew Haile",
            designation: "Emeritus Professor at Saint John’s",
            date: "2018-present"
        },
    ]
    return (
        <div className="container-fluid font-body space-y-4 py-12">
            <div id={`${about_people.our_people_title.split(" ").join("_")}`} className="people flex justify-center flex-col items-center">
                <h2 className="text-5xl font-header text-center">{about_people.our_people_title}</h2>
                <p className="text-center w-3/4">{about_people.our_people_description}</p>
            </div>

            <div id="Our_Team" className="team">
                <h2 className="text-5xl font-header text-center">Our Team</h2>
                <div className="flex flex-wrap gap-10 justify-center  break-words">
                    {team_with_image}
                </div>
                <div className="flex flex-wrap gap-5 lg:gap-8 justify-center p-2 break-words">
                    {team_without_image}
                </div>
            </div>
            
            <div id={`${about_people.other_team_members_title.split(" ").join("_")}`} className="other-team-member">
                <h3 className="text-4xl text-center font-extrabold tracking-tight leading-none">{about_people.other_team_members_title}</h3>
                <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.other_team_members_description }} />
            </div>

            <div id={`${about_people.our_partners_title.split(" ").join("_")}`} className="md:w-4/5 mx-auto space-y-16">
                <h2 className="text-5xl font-header text-center">{about_people.our_partners_title}</h2>
                <div id={`${about_people.project_collaborators_title.split(" ").join("_")}`} className="collaborators">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">{about_people.project_collaborators_title}</h3>
                    <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.project_collaborators_description }} />
                </div>

                <div id={`${about_people.board_members_title.split(" ").join("_")}`} className="board-members ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">{about_people.board_members_title}</h3>
                    <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.board_members_description }} />
                </div>

                <div id={`${about_people.project_advisers_title.split(" ").join("_")}`} className="project-advisers ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">{about_people.project_advisers_title}</h3>
                    <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.project_advisers_description }} />
                </div>

                <div id={`${about_people.institutional_collaborators_title.split(" ").join("_")}`} className="institutional-collaborators ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">{about_people.institutional_collaborators_title}</h3>
                    <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.institutional_collaborators_description }} />
                    
                </div>
                

                <div id={`${about_people.our_funders_title.split(" ").join("_")}`} className="funders ">
                    <h2 className="text-5xl font-header text-center">{about_people.our_funders_title}</h2>
                    <div >
                        <img className="w-48 py-3 mx-auto" width={720} height={720} src={`${img_path}${about_people.main_image.id}`} />
                        <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.main_image_description }} />
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-3">
                        <div className="flex flex-col w-64">
                            <img className="w-48 h-48 object-contain" src={`${img_path}${about_people.sub_image_1.id}`} />
                            <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.sub_image_1_description }} />
                        </div>
                        <div className="flex flex-col w-64">
                            <img className="w-48 h-48 object-contain" src={`${img_path}${about_people.sub_image_2.id}`} />
                            <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.sub_image_2_description }} />
                        </div>
                        <div className="flex flex-col w-64">
                            <img className="w-48 h-48 object-contain" src={`${img_path}${about_people.sub_image_3.id}`} />
                            <div className="space-y-p" dangerouslySetInnerHTML={{ __html: about_people.sub_image_3_description }} />
                        </div>

                    </div>
                    <div className="py-3 space-y-p" dangerouslySetInnerHTML={{ __html: about_people.our_funders_description }} />
                </div>
            </div>
        </div>
    )
}