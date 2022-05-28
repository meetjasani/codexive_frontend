import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { BlockPicker } from 'react-color'
import { toast } from 'react-toastify';
interface counterprops {
    main_title: string;
    counterData: {
        image: string;
        firstColor: string,
        secondColor: string,
        thirdColor: string,
        number_input: string;
        symbol: string,
        title: string;
        displayImage?: string;
    }[];
}

function CounterSection() {
    const [counterSection, setcounterSection] = useState<counterprops>(
        {
            main_title: "",
            counterData: [{
                image: "",
                firstColor: "",
                secondColor: "",
                thirdColor: "",
                number_input: "",
                symbol: "",
                title: "",
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
                    const values = [...counterSection.counterData];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setcounterSection({ ...counterSection, counterData: values });
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
    }, [selectedMainFile, fileIndex, counterSection])


    const handleSave = () => {
        let displayImage: any = [];
        const tempData = counterSection.counterData
        const temp = tempData.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        delete tempData[0].displayImage;


        const postcountData = { main_title: counterSection.main_title, counterData: tempData }
        ApiPost(`home/add-counter-section`, postcountData)
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...counterSection.counterData];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setcounterSection({ ...counterSection, counterData: temp })
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...counterSection.counterData];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setcounterSection({ ...counterSection, counterData: temp })
            });
    }

    const getDataById = () => {
        ApiGet(`home/get-counter-section`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setcounterSection({
                        main_title: "",
                        counterData: [{
                            image: "",
                            firstColor: "",
                            secondColor: "",
                            thirdColor: "",
                            number_input: "",
                            symbol: "",
                            title: "",
                            displayImage: "",
                        }]
                    })
                } else {

                    let dataArr = res.data?.counterData.map((item: any) => {
                        let dataObj = {
                            title: item.title,
                            firstColor: item.firstColor,
                            secondColor: item.secondColor,
                            thirdColor: item.thirdColor,
                            symbol: item.symbol,
                            number_input: item.number_input,
                            image: item?.image?.image,
                            displayImage: item?.image?.displayImage,
                        }
                        return dataObj
                    })

                    let coutnerSectionData = { ...counterSection, counterData: dataArr, main_title: res.data.main_title }
                    setcounterSection(coutnerSectionData);
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    const handleChangemain = (event: any, inputName: string) => {
        if (inputName === "main_title") {
            setcounterSection({ ...counterSection, main_title: event.target.value });
        }
    }

    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...counterSection.counterData];
        if (inputName === "number_input") {
            values[index].number_input = event.target.value;
        }
        if (inputName === "symbol") {
            values[index].symbol = event.target.value;
        }
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        if (inputName === "firstColor") {
            values[index].firstColor = event;
        }
        if (inputName === "secondColor") {
            values[index].secondColor = event;
        }
        if (inputName === "thirdColor") {
            values[index].thirdColor = event;
        }

        setcounterSection({ ...counterSection, counterData: values });
    }

    const handleadddsection = () => {
        const values = [...counterSection.counterData];
        values.push({
            image: "",
            firstColor: "",
            secondColor: "",
            thirdColor: "",
            number_input: "",
            symbol: "",
            title: "",
            displayImage: ""
        })
        setcounterSection({ ...counterSection, counterData: values });
    }

    const handleRemovesection = (id: any, index: any) => {
        const values = [...counterSection.counterData]
        if (counterSection.counterData.length > 1) {
            values.splice(index, 1);
            setcounterSection({ ...counterSection, counterData: values });
        }
    }

    const attechImage = (index: number) => {
        document.getElementById(`attechMainImage${index}`)?.click();
    };

    const handlePreview = () => {
        window.open(`/`, '_blank')
    }
    return (
        <div className="pr-blogdetali">
            <div className="pv-blog-title">
                <p>Counter Section</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <th>Main Title</th>
                <td>
                    <input type="text" placeholder="Please enter main title" name="main_title"
                        value={counterSection.main_title}
                        onChange={(event) => {
                            handleChangemain(event, "main_title")
                        }}
                    />
                </td>
            </table>

            {
                counterSection?.counterData?.map((input: any, index: number) => (
                    <>
                        <table className=" pv-dashtable mt-3 custom-table-border">

                            <tr className="font-18-bold pv-title-table ">
                                <th>Image</th>
                                <td colSpan={5}>
                                    <div className="rel-pv">
                                        {/* <img
                                        className="pv-Choose-Us mt-3"
                                        src={input?.displayImage === "" ? "../../img/2.png" : input?.displayImage}
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/2.png" }}
                                        alt=""
                                    /> */}
                                        {/* <img className="pv-Choose-Us mt-3" src={input?.displayImage == "" ? "./img/1139.png" : input?.displayImage} alt="" /> */}
                                        <img
                                            src={input?.displayImage === "" ? "../../img/placeholder.png" : input?.displayImage}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = "../../img/placeholder.png" }}
                                            alt=""
                                        />
                                        <input className="mt-4 mb-4" hidden id={`attechMainImage${index}`} type="file" name="choosefile" value={input?.choosefile}
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
                            <tr>

                                <th>First color</th>
                                <td>    <BlockPicker color={input?.firstColor == null ? "" : input?.firstColor} onChangeComplete={({ hex }) => handleChange(index, hex, "firstColor")} /></td>
                                <th>Second Color</th>
                                <td>  <BlockPicker color={input?.secondColor == null ? "" : input?.secondColor} onChangeComplete={({ hex }) => handleChange(index, hex, "secondColor")} /></td>
                                <th>Third Color</th>
                                <td>  <BlockPicker color={input?.thirdColor == null ? "" : input?.thirdColor} onChangeComplete={({ hex }) => handleChange(index, hex, "thirdColor")} /></td>
                            </tr>


                            <tr className="font-18-bold pv-title-table">
                                <th>Number Input</th>
                                <td colSpan={5}> <input type="number" placeholder="Please enter Numbers" name="number_input" value={input.number_input} onChange={(event) => { handleChange(index, event, "number_input"); }} /></td>


                            </tr>
                            <tr className="font-18-bold pv-title-table">
                                <th>symbol</th>
                                <td colSpan={5}> <input type="text" placeholder="Please enter symbol" name="symbol" value={input.symbol} onChange={(event) => { handleChange(index, event, "symbol"); }} /></td>
                            </tr>


                            <tr className="font-18-bold pv-title-table">
                                <th>Title</th>
                                <td colSpan={5}> <input type="text" placeholder="Please enter title" name="title" value={input.title} onChange={(event) => { handleChange(index, event, "title"); }} /></td>
                            </tr>

                        </table>

                        <div className="w-100 justify-content-end d-flex">
                            {counterSection.counterData.length > 0 && (
                                <>
                                    {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                    <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                        handleRemovesection(input.id, index);
                                    }}>delete</Button>
                                </>
                            )}
                            {counterSection.counterData.length - 1 === index && (
                                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                            )}

                        </div>
                    </>
                ))}

            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handlePreview}>Preview</Button>

                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}
                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> Detal</Button> */}
            </div>

        </div>
    )
}

export default CounterSection
