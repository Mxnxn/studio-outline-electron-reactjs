import React, { Fragment } from "react";
import { PDFViewer, View, Text, Document, Page, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "Archia",
    src: require("../font/FOR.ttf").default,
});
Font.register({
    family: "Comfortaa",
    src: require("../font/CN.ttf").default,
});
Font.register({
    family: "Nunito",
    src: require("../font/NSR.ttf").default,
});
Font.register({
    family: "Nunito Bold",
    src: require("../font/NSB.ttf").default,
});
Font.register({
    family: "Opensans",
    src: require("../font/OSB.ttf").default,
});

Font.register({
    family: "Opensans Normal",
    src: require("../font/OSR.ttf").default,
});

Font.register({
    family: "Arial Rounded",
    src: require("../font/AR.ttf").default,
});
Font.register({
    family: "TNR",
    src: require("../font/TNR.ttf").default,
});

const AppointmentLetter = ({ loading, state }) => {
    const styles = StyleSheet.create({
        page: {
            display: "flex",
            flexDirection: "column",
            padding: 35,
            paddingBottom: 50,
        },
        header: {
            height: 30,
            display: "flex",
            flexDirection: "row",
            marginBottom: 16,
        },
        heading: {
            fontFamily: "Arial Rounded",
        },
        subHead: {
            fontFamily: "Comfortaa",
            fontSize: 8,
        },
        lefta: {
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "right",
        },

        ntext: {
            fontFamily: "TNR",
            fontSize: 8,
        },
        row: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
        },
        col: {
            width: "5pt",
        },
        letterName: {
            width: "100%",
            fontFamily: "Nunito Bold",
            fontSize: 12,
            height: 10,
            backgroundColor: "#FFC000",
            display: "flex",
            alignItems: "center",
        },
        letterNameText: {
            width: "auto",
            fontFamily: "TNR",
            borderBottom: 1,
            borderBottomColor: "black",
        },
        bodyView: {
            display: "flex",
            flexDirection: "column",
            marginTop: 0,
            width: "auto",
        },
        bodyText: {
            fontFamily: "TNR",
            fontSize: 12,
            marginTop: 2,
            marginBottom: 2,
        },
        bodyCatView: {
            marginTop: 5,
            marginBottom: 5,

            display: "flex",
            alignItems: "flex-start",
        },
        bodyCat: {
            fontFamily: "TNR",
            width: "auto",
            borderBottom: 1,
            display: "inline",
            fontSize: 11,
            borderBottomColor: "black",
        },
        footer: {
            display: "flex",
            width: "40%",
            marginLeft: "auto",
            marginTop: 30,
        },
        footerLeft: {
            marginTop: 20,
            display: "flex",
            width: "100%",
            alignItems: "center",
        },
        bodyToText: {
            fontFamily: "Opensans",
            fontSize: 11,
        },
        headName: {
            width: "100%",
            fontFamily: "TNR",
            fontSize: 16,
            marginTop: 12,
            display: "flex",
            alignItems: "center",
        },
    });

    return (
        loading && (
            <Fragment>
                <PDFViewer className="pop" style={{ height: "100%", width: "100%" }}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View fixed style={{ display: "flex", flexDirection: "column" }}>
                                <View style={styles.header}>
                                    <View style={styles.righta}>
                                        <Text style={styles.heading}>Studio Outline</Text>
                                        <Text style={styles.subHead}>Interior Design – Architecture - Planning</Text>
                                    </View>
                                    <View style={styles.lefta}>
                                        <Text style={{ ...styles.heading, fontSize: 9 }}>Web: www.studiooutline.in</Text>
                                        <Text style={{ ...styles.heading, fontSize: 9 }}>Email: info@studiooutline.in</Text>
                                        <Text style={{ ...styles.heading, fontSize: 9 }}>Phone: +91-8401527637</Text>
                                    </View>
                                </View>
                                <View style={{ ...styles.letterName, marginBottom: 16 }}></View>
                            </View>
                            <View style={styles.bodyView}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <View>
                                        <Text style={styles.bodyToText}>To,</Text>
                                        <Text style={styles.bodyToText}>{state.name}</Text>
                                        {state.arrayOfAddress.map((addr, index) => (
                                            <Text style={styles.bodyToText}>
                                                {addr}
                                                {index === state.arrayOfAddress.length - 1 ? "." : ","}
                                            </Text>
                                        ))}
                                    </View>
                                    <View style={{ marginLeft: "auto" }}>
                                        <Text style={styles.bodyToText}>{state.date}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.headName, marginBottom: 12 }}>
                                <Text style={styles.letterNameText}>Our Design Consultancy Services Which Include The Following</Text>
                            </View>
                            <View style={styles.bodyView}>
                                <Text style={styles.bodyText}>• Site analysis that duly accounts for the context.</Text>
                                <Text style={styles.bodyText}>• Conceptualization.</Text>
                                <Text style={styles.bodyText}>• Translation of concepts into an executable design.</Text>
                                <Text style={styles.bodyText}>• Consistent interaction and co-ordination for perfect on-site execution.</Text>
                                <Text style={styles.bodyText}>• Site analysis with contextual references.</Text>
                                <Text style={styles.bodyText}>• Conversion of concept into executable designs through development of execution drawings.</Text>
                                <Text style={styles.bodyText}>• Selection of contractors and other labour agencies.</Text>
                                <Text style={styles.bodyText}>
                                    • Interaction and co-ordination with site managers and agencies to ensure work is executed as Per designs.
                                </Text>
                                <Text style={styles.bodyText}>• Ensuring quality of workmanship is maintained on site.</Text>
                                <Text style={styles.bodyText}>• Selection of materials, fittings and hardware etc...</Text>
                                <Text style={styles.bodyText}> • Selection of soft furnishings and art work.</Text>
                                {state.rows.map((el, index) => (
                                    <>
                                        <View style={{ ...styles.bodyCatView, marginVertical: 6 }}>
                                            <Text style={{ ...styles.bodyCat, fontSize: 14 }}>{el.heading}</Text>
                                        </View>
                                        <Text style={styles.bodyText}>{el.description}</Text>
                                    </>
                                ))}

                                <View style={{ ...styles.bodyCatView, marginVertical: 6 }}>
                                    <Text style={{ ...styles.bodyCat, fontSize: 14 }}>Payment Schedule:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    The professional{" "}
                                    <Text style={{ fontFamily: "TNR", textDecoration: "underline" }}>
                                        consultation fees for planning and interior designing and generating drawings, sourcing of material & etc
                                    </Text>{" "}
                                    would be charge on lumsum basis i.e.{" "}
                                    <Text style={{ fontFamily: "TNR", textDecoration: "underline" }}>Rs. {state.amount}</Text> to be paid.
                                </Text>
                                <View style={{ marginVertical: 6 }}></View>
                                <Text style={{ ...styles.bodyText, color: "red", fontFamily: "TNR" }}>
                                    Total workable Area = <Text style={{ textDecoration: "underline" }}>{state.totalSqft} sq.</Text> Approximate
                                </Text>

                                <View style={{ marginVertical: 6 }}></View>
                                <Text style={{ ...styles.bodyText, fontSize: 8 }}>Note:</Text>
                                <Text style={{ ...styles.bodyText, fontSize: 8 }}>1. Site visit will be periodic as per req.</Text>
                                <Text style={{ ...styles.bodyText, fontSize: 8 }}>2. Fees once paid will not be refundable.</Text>
                                <Text style={{ ...styles.bodyText, fontSize: 8 }}>3. GST 18% will be applicable on designing consultation charges.</Text>
                                <View style={{ marginVertical: 6 }}></View>
                                <View style={{ marginVertical: 6 }}></View>
                                <View style={{ marginVertical: 6 }}></View>

                                <Text style={{ ...styles.bodyText, fontSize: 8 }}>Thank you. Regards,</Text>
                                <Text style={{ ...styles.bodyText, fontFamily: "Arial Rounded", fontSize: 14, marginTop: 6 }}>Studio Outline</Text>
                            </View>
                            <View
                                style={{
                                    ...styles.headName,
                                    marginTop: "auto",
                                    justifyContent: "flex-end",
                                    position: "absolute",
                                    bottom: "24px",
                                    left: "34px",
                                }}
                                fixed
                            >
                                <Text
                                    style={{
                                        ...styles.letterNameText,
                                        borderBottom: 0,
                                        fontFamily: "Arial Rounded",
                                        fontSize: 10,
                                    }}
                                >
                                    202 – SAI SHIVAM FLATS, 6 – SHRINIKITAN SOCIETY, SAMPTARAO COLONY, ALKAPURI - 390007
                                </Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Fragment>
        )
    );
};

export default AppointmentLetter;
