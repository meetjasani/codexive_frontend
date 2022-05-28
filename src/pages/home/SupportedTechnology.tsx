import React, { useEffect, useState } from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

interface technologyprops {
    main_title: string;
    technology: {
        image: string;
        title: string;
        displayImage?: string,
    }[],
}

const SupportedTechnology = () => {
    const [technologySection, setTechnologySection] = useState<technologyprops>(
        {
            main_title: "",
            technology: [{
                image: "",
                title: "",
                displayImage: "",
            }]
        }
    );
    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const handleChangemain = (event: any, inputName: string) => {
        if (inputName === "main_title") {
            setTechnologySection({ ...technologySection, main_title: event.target.value })
        }
    }
    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...technologySection.technology];
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        setTechnologySection({ ...technologySection, technology: values });
    }

    const handleadddsection = () => {
        const values = [...technologySection.technology];
        values.push({
            image: "",
            title: "",
            displayImage: "",
        })
        setTechnologySection({ ...technologySection, technology: values });
    }

    const handleRemovesection = (id: any, index: any) => {
        if (technologySection.technology.length > 1) {
            const values = [...technologySection.technology];
            values.splice(index, 1);
            setTechnologySection({ ...technologySection, technology: values });
        }
    }

    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const values = [...technologySection.technology];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setTechnologySection({ ...technologySection, technology: values });
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
        const tempData = technologySection.technology;

        const temp = tempData.map((tech: any) => {
            displayImage.push(tech.displayImage)
            delete tech.displayImage;
            return tech
        })
        delete tempData[0].displayImage;

        const posthowWeWorkData = { main_title: technologySection.main_title, technology: tempData }

        ApiPost(`technology/add-supported-technology`, posthowWeWorkData)
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...technologySection.technology];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setTechnologySection({ ...technologySection, technology: temp })
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...technologySection.technology];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setTechnologySection({ ...technologySection, technology: temp })
            });
    }

    const getDataById = () => {
        ApiGet(`technology/get-supported-technology`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setTechnologySection({
                        main_title: "",
                        technology: [{
                            image: "",
                            title: "",
                            displayImage: "",
                        }]
                    })
                } else {
                    let dataArr = res?.data?.technology?.map((item: any) => {
                        let dataObj = {
                            title: item.title,
                            image: item?.image?.image,
                            displayImage: item?.image?.displayImage,
                        }
                        return dataObj
                    })
                    let technologySectionData = { ...technologySection, technology: dataArr, main_title: res?.data?.main_title }
                    setTechnologySection(technologySectionData);
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
                <p>Supported Technology</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <th>Main Title</th>
                <td>
                    <input type="text" placeholder="Please enter main title" name="main_title"
                        value={technologySection.main_title}
                        onChange={(event) => {
                            handleChangemain(event, "main_title");
                        }}
                    />
                </td>
            </table>
            {technologySection?.technology?.map((input: any, index: number) => (
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

                    </table>


                    <div className="w-100 justify-content-end d-flex">
                        {technologySection?.technology?.length > 0 && (
                            <>
                                <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                    handleRemovesection(input.id, index);
                                }}>delete</Button>
                            </>
                        )}
                        {technologySection?.technology?.length - 1 === index && (
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

export default SupportedTechnology

