import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { selectFilter } from 'react-bootstrap-table2-filter';

interface testimonial {
    main_title: string;
    image: string;
    title: string;
    description: string;
    displayImage?: string;

}
const HomeTestimonial = () => {
    const [testimonialData, settestimonialData] = useState<testimonial>({
        main_title: "",
        image: "",
        title: "",
        description: "",
        displayImage: "",
    });

    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const getDataById = () => {
        ApiGet(`homesupportedTechnology/get-home-supportedtechnology`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    settestimonialData({
                        main_title: "",
                        title: "",
                        image: "",
                        description: ""
                    })
                } else {
                    settestimonialData({
                        main_title: res.data.main_title,
                        title: res.data.title,
                        image: res?.data?.image,
                        displayImage: res.data?.image?.displayImage,
                        description: res.data.description
                    })
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    const handleSave = () => {
        const tempData = { ...testimonialData }
        let displayImage = tempData.displayImage
        delete tempData.displayImage;

        ApiPost(`homesupportedTechnology/add-home-supportedtechnology`, tempData)
            .then((res: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
                settestimonialData({ ...testimonialData, displayImage })
            });
    }
    const attechImage = () => {
        document.getElementById(`attechMainImage`)?.click();
    };
    const uploadImage = (index: number) => {
        console.log(index)
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    settestimonialData({ ...testimonialData, displayImage: res?.display_url, image: res?.url });
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

    return (
        <div>
            <div className="pr-blogdetali">
                <div className="pv-blog-title">
                    <p>HomePage Testimonial</p>
                </div>
                <table className=" pv-dashtable mt-3 custom-table-border">
                    <tr className="font-18-bold pv-title-table">
                        <th>Main title</th>
                        <td> <input type="text" placeholder="Please enter main title" name="main_title" value={testimonialData.main_title} onChange={(e) => settestimonialData({ ...testimonialData, main_title: e.target.value })} /></td>
                    </tr>
                    <tr className="font-18-bold pv-title-table ">

                        <th>Image</th>
                        <td>
                            <div className="rel-pv"><img className="pv-About-Us mt-3" src={testimonialData?.displayImage == "" ? "./img/1139.png" : testimonialData?.displayImage} alt="" />
                                <input className="mt-4 mb-4" hidden id={`attechMainImage`} type="file" name="choosefile"
                                    onChange={(e) => {
                                        if (!e.target.files || e.target.files.length === 0) {
                                            setSelectedMainFile(undefined);
                                            return;
                                        }
                                        setSelectedMainFile(e.target.files[0]);
                                    }}
                                />
                            </div>
                            upload image=711*615
                            <div className="ml-auto pv-hero-btn">
                                <Button type="" className="dash-bg-pink" onClick={() => attechImage()}> Upload</Button>
                            </div>
                        </td>
                    </tr>
                    <tr className="font-18-bold pv-title-table">
                        <th>title</th>
                        <td> <input type="text" placeholder="Please enter title" name="title" value={testimonialData.title} onChange={(e) => settestimonialData({ ...testimonialData, title: e.target.value })} /></td>
                    </tr>

                    <tr className="font-18-bold pv-title-table">
                        <th>Description</th>
                        <td > <input type="text" placeholder="Please enter description" name="description" value={testimonialData.description} onChange={(e) => settestimonialData({ ...testimonialData, description: e.target.value })} /></td>
                    </tr>

                </table>

                <div className="text-center ">
                    <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave} >Save</Button>
                </div>
            </div>
        </div>
    )
}

export default HomeTestimonial
