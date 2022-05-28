import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
interface whyprops {
    main_title: string;
    workSection: {
        image: string;
        title: string;
        details: string;
        displayImage?: string,
    }[],
}

function HowWeWork() {
    const [whySection, setWhySection] = useState<whyprops>(
        {
            main_title: "",
            workSection: [{
                image: "",
                title: "",
                details: "",
                displayImage: "",
            }]
        }
    );
    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const handleChangemain = (event: any, inputName: string) => {
        if (inputName === "main_title") {
            setWhySection({ ...whySection, main_title: event.target.value });
        }
    }

    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...whySection.workSection];
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        if (inputName === "details") {
            values[index].details = event.target.value;
        }
        setWhySection({ ...whySection, workSection: values });
    }


    const handleadddsection = () => {
        const values = [...whySection.workSection];
        values.push({
            image: "",
            title: "",
            details: "",
            displayImage: "",
        })
        setWhySection({ ...whySection, workSection: values });
    }

    const handleRemovesection = (id: any, index: any) => {
        const values = [...whySection.workSection];
        if (values.length > 1) {
            values.splice(index, 1);
            setWhySection({ ...whySection, workSection: values });
        }
    }

    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const values = [...whySection.workSection];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setWhySection({ ...whySection, workSection: values });
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    const attechImage = (index: number) => {
        document.getElementById(`attechMainImage${index}`)?.click();
    };

    useEffect(() => {
        if (selectedMainFile) {
            uploadImage(fileIndex)
        }
    }, [selectedMainFile, fileIndex])

    const handleSave = () => {
        let displayImage: any = [];
        const tempData = whySection.workSection;

        const temp = tempData.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        delete tempData[0].displayImage;

        const posthowWeWorkData = { main_title: whySection.main_title, workSection: tempData }

        ApiPost(`home/add-howWork-section`, posthowWeWorkData)
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...whySection.workSection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection({ ...whySection, workSection: temp })
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...whySection.workSection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection({ ...whySection, workSection: temp })
            });
    }


    const getDataById = () => {
        ApiGet(`home/get-howWork-section`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setWhySection({
                        main_title: "",
                        workSection: [{
                            image: "",
                            title: "",
                            details: "",
                            displayImage: "",
                        }]
                    })
                } else {
                    let dataArr = res?.data?.workSection?.map((item: any) => {
                        let dataObj = {
                            title: item.title,
                            details: item.details,
                            image: item?.image?.image,
                            displayImage: item?.image?.displayImage,
                        }
                        return dataObj
                    })
                    let whySectionData = { ...whySection, workSection: dataArr, main_title: res?.data?.main_title }
                    setWhySection(whySectionData);
                    // setWhySection(res.data?.map((item: any) => {
                    //     return {
                    // title: item.title,
                    // details: item.details,
                    // image: item?.image?.image,
                    // displayImage: item?.image?.displayImage,
                    //     }
                    // }))
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    const handlePreview = () => {
        window.open(`/`, '_blank')
    }
    return (
        <div className="pr-blogdetali">
            <div className="pv-blog-title">
                <p>How We Work</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <th>Main Title</th>
                <td>
                    <input type="text" placeholder="Please enter main title" name="main_title"
                        value={whySection.main_title}
                        onChange={(event) => {
                            handleChangemain(event, "main_title");
                        }}
                    />
                </td>
            </table>
            {whySection?.workSection?.map((input: any, index: number) => (
                <>
                    <table className=" pv-dashtable mt-3 custom-table-border">
                        <tr className="font-18-bold pv-title-table ">
                            <th>Image</th>
                            <td>

                                <div className="rel-pv">
                                    {/* <img className="pv-work-image mt-3" src={input?.displayImage == "" ? "./img/1139.png" : input?.displayImage} alt="" /> */}
                                    <img
                                        src={input?.displayImage === "" ? "../../img/placeholder.png" : input?.displayImage}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/placeholder.png" }}
                                        alt=""
                                    />
                                    <div>
                                        <input className="mt-4 mb-2 " type="file" hidden id={`attechMainImage${index}`} name="choosefile" value={input.howweworkfile} onChange={(e) => {
                                            if (!e.target.files || e.target.files.length === 0) {
                                                setSelectedMainFile(undefined);
                                                return;
                                            }
                                            setFileIndex(index)
                                            setSelectedMainFile(e.target.files[0]);
                                        }} />
                                    </div>
                                </div>
                                upload image=50*39
                                <div className="ml-auto pv-hero-btn">
                                    <Button type="" className="dash-bg-pink" onClick={() => attechImage(index)}> Upload</Button>
                                </div>
                            </td>
                        </tr>

                        <tr className="font-18-bold pv-title-table">
                            <th>Title</th>
                            <td> <input type="text" placeholder="Please enter title" name="title" value={input.title} onChange={(event) => { handleChange(index, event, "title"); }} /></td>
                        </tr>

                        <tr className="font-18-bold pv-title-table">
                            <th>Description</th>
                            <td><textarea className="w-100 border-0" placeholder="Please enter description" value={input.details} rows={5} name="details" onChange={(event) => handleChange(index, event, "details")} /></td>
                        </tr>
                    </table>


                    <div className="w-100 justify-content-end d-flex">
                        {whySection.workSection.length > 0 && (
                            <>
                                <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                    handleRemovesection(input.id, index);
                                }}>delete</Button>
                            </>
                        )}
                        {whySection.workSection.length - 1 === index && (
                            <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                        )}

                    </div>
                </>
            ))}
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handlePreview}>Preview</Button>
            </div>

        </div>
    )
}

export default HowWeWork
