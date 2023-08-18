import Funders from "@/assets/images/funders.png"
import Image from "next/image";
export default function page() {
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
            <div className="people flex justify-center flex-col items-center">
                <h2 className="text-5xl font-header text-center">Our People</h2>
                <p className="text-center w-3/4">
                    The Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary digital humanities project (PEMM) is a comprehensive resource for the 1,000+ miracle stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt, and preserved in Gəˁəz between 1300 and the present.
                </p>
            </div>

            <div className="team">
                <h2 className="text-5xl font-header text-center">Our Team</h2>
                <div className="flex flex-wrap gap-10 justify-center  break-words">
                    {
                        team.map(t => (
                            <>
                                {t.img && 
                                    <div className="text-center w-72 py-5">
                                        <Image className="rounded-full w-72 py-3 mx-auto" src={t.img} />
                                        <h3 className="font-bold text-center w-full text-xl tracking-tight">{t.name}</h3>
                                        <p className="text-center">{t.designation}</p>
                                        <span>{t.date}</span>
                                    </div>
                                }
                            </>
                        ))
                    }
                </div>
                <div className="flex flex-wrap gap-5 lg:gap-8 justify-center p-2 break-words">
                    {
                        team.map(t => (
                            <>
                                {!t.img && 
                                    <div className="text-center w-72 py-4">
                                        <h3 className="font-bold text-center w-full text-xl tracking-tight">{t.name}</h3>
                                        <p className="text-center">{t.designation}</p>
                                        <span className="italic text-sm">{t.date}</span>
                                    </div>
                                }
                            </>
                        ))
                    }
                </div>
            </div>
            
            <div className="other-team-member">
                <h3 className="text-4xl text-center font-extrabold tracking-tight">Other Team Members</h3>
                <p className="text-center">Michael Franz (Princeton Financial Support Services 2016-present)</p>
                <p className="text-center">Amanda (Princeton Financial Support Services 2023-present)</p>
                <p className="text-center">Caitlin Charos Rollins (Grant Writing 2020)</p>
                <p className="text-center">Alba Spahiu (Assistant Web Programmer, 2021)</p>
            </div>
            
            <div className="incipit-typing">
                <h3 className="text-2xl text-center font-extrabold">Story and Manuscript Incipit Typing 2020</h3>
                <p className="text-center">Tariku Abas Sherif, Beimnet Beyene Kassaye, Annabel S. Lemma, Tsega-ab Hailemichael, Chiara Lombardi, Ellen Perleberg</p>
            </div>
            
            <div className="incipit-typing">
                <h3 className="text-2xl text-center font-extrabold">European language translation and summary 2019</h3>
                <p className="text-center">Mika J. Hyman, Grace Matthews, Allie V. Mangel; Ellen Li, Elliot Galvis, Lauren D. Johnson, Sana Khan, Jason O. Seavey, Leia R. Walker, Nati Arbelaez Solano, Daniel Somwaru</p>
            </div>

            <div className="md:w-4/5 mx-auto space-y-16">
                <h2 className="text-5xl font-header text-center">Our Partners</h2>
                <div className="collaborators ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">Project Collaborators</h3>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest, cataloger, and scholar, serving at Virgin Mary Ethiopian Orthodox Church in Los Angeles, and on the Ethiopic Manuscript Imaging Project</p>
                    <p className="py-1"><strong>Dr. Solomon Gebreyes,</strong> Professor for Ethiopian Studies at the Asien-Afrika-Institut; director of the Hiob Ludolf Centre at Universität Hamburg; and head of Beta masahaft: Die Schriftkultur deschristlichen Äthiopien und Eritreas: Eine multimediale Forschungsumgebung (2016-2040).</p>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest, cataloger, and scholar, serving at Virgin Mary Ethiopian Orthodox Church in Los Angeles, and on the Ethiopic Manuscript Imaging Project</p>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest, cataloger, and scholar, serving at Virgin Mary Ethiopian Orthodox Church in Los Angeles, and on the Ethiopic Manuscript Imaging Project</p>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest, cataloger, and scholar, serving at Virgin Mary Ethiopian Orthodox Church in Los Angeles, and on the Ethiopic Manuscript Imaging Project</p>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest, cataloger, and scholar, serving at Virgin Mary Ethiopian Orthodox Church in Los Angeles, and on the Ethiopic Manuscript Imaging Project</p>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest, cataloger, and scholar, serving at Virgin Mary Ethiopian Orthodox Church in Los Angeles, and on the Ethiopic Manuscript Imaging Project</p>
                </div>

                <div className="board-members ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">Board Members</h3>
                    <p className="py-1"><strong>Elias Wondimu,</strong> CEO and President of TSEHAI Corp., a global knowledge company</p>
                    <p className="py-1"><strong>Prof. Alessandro Bausi,</strong> Professor for Ethiopian Studies at the Asien-Afrika-Institut; director of the Hiob Ludolf Centre at Universität Hamburg; and head of Beta masahaft: Die Schriftkultur deschristlichen Äthiopien und Eritreas: Eine multimediale Forschungsumgebung (2016-2040).</p>
                    <p className="py-1"><strong>Archpriest Mussie Berhe,</strong> priest and scholar, serving at St. Michael Ethiopian Orthodox Church of Los Angeles</p>
                    <p className="py-1"><strong>chpriest Woldesemait Teklehaymanot,</strong> monk and scholar, serving at St. Michael Ethiopian Orthodox Church in Los Angeles</p>
                    <p className="py-1"><strong>Rev. Melaku Terefe,</strong> priest and scholar, Virgin Mary Ethiopian Orthodox Church in Los Angeles</p>
                    <p className="py-1"><strong>Dr. Solomon Gebreyes,</strong> Research Fellow at the Hiob Ludolf Centre for Ethiopian Studies at the University of Hamburg, Germany</p>
                </div>

                <div className="project-advisers ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">Project Advisers</h3>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                    <p className="py-1"><strong>Prof. Samantha Kelly</strong> Professor of History at Rutgers University, scholar of medieval Europe and Ethiopia</p>
                </div>

                <div className="institutional-collaborators ">
                    <h3 className="text-4xl font-header text-center mb-3 md:mb-5">Institutional Collaborators</h3>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    <p className="py-1">Hill Museum & Manuscript Library. Lead by Father Columba Stewart, it hosts the Ethiopian Manuscript Microfilm Library (EMML), with more than 8000 manuscripts microfilmed in Ethiopian churches and monasteries during the 1970s and 1980s.Getat chew Haile and William F. Macomber were the lead catalogers of this collection for many decades. HMML also includes digital copies of UNESCO and Ernst Hammerschmidt Tanasee projects. With special thanks to Julie Dietman, assistant for Development and Library Services at HMML, and John Meyerhofer, Systems Librarian.</p>
                    
                </div>
                

                <div className="funders ">
                    <h2 className="text-5xl font-header text-center">Our Funders</h2>
                    <div >
                        <Image className="rounded-full w-52 py-3 mx-auto" src={Funders} />
                    </div>
                    <p className="text-center">NEH Scholarly Editions and Scholarly Translations Grant (2021-2024)</p>
                    <p className="text-center">NEH Digital Humanities Advancement Grant (2021-2024)</p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                        <div className="flex flex-col w-52">
                            <Image className="rounded-full w-52 py-3" src={Funders} />
                            <p className="text-center">Princeton CDH Research Partnership & Data Curation Grants (2017-2020)</p>
                        </div>
                        <div className="flex flex-col w-52">
                            <Image className="rounded-full w-52 py-3" src={Funders} />
                            <p className="text-center">Princeton Humanities Council David A. Gardner ’69 Magic Project (2019-2021)</p>
                        </div>
                        <div className="flex flex-col w-52">
                            <Image className="rounded-full w-52 py-3" src={Funders} />
                            <p className="text-center">Princeton International Affairs & Operations, International Fund (2019-2021)</p>
                        </div>

                    </div>
                    <p className="text-center">Other funders were the Princeton Department of African American Studies, directed by the Eddie S. Glaude, as well as the Program in Gender and Sexuality Studies (directed by Wallace Best), the Program in African Studies (directed by Emmanuel Kreike and now Chika Okeke-Agulu), the Center for the Study of Religion (directed by Jonathan Gold), and the Department of Comparative Literature (directed by Thomas Hare).</p>
                </div>
            </div>
        </div>
    )
}