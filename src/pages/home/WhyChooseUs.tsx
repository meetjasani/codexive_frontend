import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
export interface whyprops {
    main_title: string;
    section: {
        description: string;
        image: string;
        displayImage?: string;
        title: string;
    }[];
}
const WhyChooseUs = () => {
    const [whySection, setWhySection] = useState<whyprops>(
        {
            main_title: "",
            section: [{
                image: "",
                title: "",
                description: "",
                displayImage: "",
            }]
        }

    );

    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();
    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const values = [...whySection.section];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setWhySection({ ...whySection, section: values });
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    useEffect(() => {
        if (selectedMainFile) {
            uploadImage(fileIndex)
        }
    }, [selectedMainFile, fileIndex])

    const attechImage = (index: number) => {
        document.getElementById(`attechMainImage${index}`)?.click();
    };


    const handleChangemain = (event: any, inputName: string) => {
        if (inputName === "main_title") {
            setWhySection({ ...whySection, main_title: event.target.value });
        }
    }

    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...whySection.section];
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        if (inputName === "description") {
            values[index].description = event.target.value;
        }
        setWhySection({ ...whySection, section: values });
    }
    const handleSave = () => {
        let displayImage: any = [];
        const tempData = whySection.section;

        const temp = tempData.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        delete tempData[0].displayImage;

        const postWhyChooseData = { main_title: whySection.main_title, section: tempData }

        ApiPost(`home/add-WhyChoose-section`, postWhyChooseData)
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...whySection.section]
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection({ ...whySection, section: temp })
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...whySection.section];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection({ ...whySection, section: temp })
            });
    }

    const handlePreview = () => {
        window.open(`/`, '_blank')
        // window.open(`/?id=`)
    }
    const getDataById = () => {
        ApiGet(`home/get-WhyChoose-section`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setWhySection({
                        main_title: "",
                        section: [{
                            image: "",
                            title: "",
                            description: "",
                            displayImage: "",

                        }]
                    })
                } else {

                    let dataArr = res?.data?.section?.map((item: any) => {
                        let dataObj = {
                            title: item.title,
                            description: item.description,
                            image: item?.image,
                            displayImage: item?.displayImage,
                        }
                        return dataObj
                    })
                    let whySectionData = { ...whySection, section: dataArr, main_title: res?.data?.main_title }
                    setWhySection(whySectionData);
                    // setWhySection(res.data?.map((item: any) => {
                    //     return {
                    // title: item.title,
                    // description: item.description,
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
    const handleadddsection = () => {
        const values = [...whySection.section];
        values.push({
            image: "",
            title: "",
            description: "",
            displayImage: ""
        })
        setWhySection({ ...whySection, section: values });
    }
    const handleRemovesection = (id: any, index: any) => {
        const values = [...whySection.section]
        if (values.length > 1) {
            // const values = [...whySection];
            values.splice(index, 1);
            setWhySection({ ...whySection, section: values });
        }
    }
    return (
        <div id="#why_choose_us" className="pr-blogdetali">
            <div className="pv-blog-title">
                <p>Why Choose Us</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table">
                    <th>Main_title</th>
                    <td>
                        <input type="text" placeholder="Please enter main title" name="main_title" value={whySection.main_title} onChange={(event) => { handleChangemain(event, "main_title") }} />
                    </td>
                </tr>
            </table>
            {whySection?.section.map((input: any, index: number) => (
                <>

                    <table className=" pv-dashtable mt-3 custom-table-border">
                        <tr className="font-18-bold pv-title-table ">
                            <th>Image</th>
                            <td>

                                <div className="rel-pv">
                                    {/* <img className="pv-Choose-Us mt-3" src={input?.displayImage == "" ? "./img/1139.png" : input?.displayImage} alt="" /> */}
                                    <img
                                        src={input?.displayImage === "" ? "../../img/placeholder.png" : input?.displayImage}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/placeholder.png" }}
                                        alt=""
                                    />
                                    <input className="mt-4 mb-4" hidden id={`attechMainImage${index}`} type="file" name="choosefile" value={input.choosefile}
                                        onChange={(e) => {
                                            if (!e.target.files || e.target.files.length === 0) {
                                                setSelectedMainFile(undefined);
                                                return;
                                            }
                                            setFileIndex(index)
                                            setSelectedMainFile(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                upload image=70*70
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
                            <td><textarea className="w-100 border-0" placeholder="Please enter description" value={input.description} rows={5} name="description" onChange={(event) => { handleChange(index, event, "description"); }} /></td>
                        </tr>
                    </table>
                    <div className="w-100 justify-content-end d-flex">
                        {whySection.section.length > 0 && (
                            <>
                                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                    handleRemovesection(input.id, index);
                                }}>delete</Button>
                            </>
                        )}
                        {whySection.section.length - 1 === index && (
                            <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                        )}
                    </div>
                </>
            ))}
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handlePreview}>Preview</Button>
                {/* 
                <Button type="" className=" pv-main-btn-img btn-secondary">
                    <Link to={`/?id=1234`} target="_blank">Preview</Link>
                </Button> */}
                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}
                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> Detal</Button> */}
            </div>
        </div>
    )
}
export default WhyChooseUs