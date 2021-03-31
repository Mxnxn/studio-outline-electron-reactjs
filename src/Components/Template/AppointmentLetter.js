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

const AppointmentLetter = ({ loading }) => {
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
            fontFamily: "Archia",
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
            fontFamily: "Nunito",
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
            fontFamily: "Opensans Normal",
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
            fontFamily: "Nunito Bold",
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
            fontFamily: "Nunito Bold",
            fontSize: 16,
            marginTop: 20,
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
                                </View>
                                <View style={{ ...styles.letterName, marginBottom: 16 }}></View>
                            </View>
                            <View style={styles.bodyView}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <View>
                                        <Text style={styles.bodyToText}>To,</Text>
                                        <Text style={styles.bodyToText}>Mr. MINESH PATEL,</Text>
                                        <Text style={styles.bodyToText}>PATWA ESTATE,</Text>
                                        <Text style={styles.bodyToText}>B/H BOMBAY SHOPPING CENTRE,</Text>
                                        <Text style={styles.bodyToText}>ALKAPURI,</Text>
                                        <Text style={styles.bodyToText}>VADODARA.</Text>
                                    </View>
                                    <View style={{ marginLeft: "auto" }}>
                                        <Text style={styles.bodyToText}>11.11.1998</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.headName }}>
                                <Text style={styles.letterNameText}>
                                    Our design consultancy services which include the following:
                                </Text>
                            </View>
                            <View style={styles.bodyView}>
                                <Text style={styles.bodyText}>• Site analysis that duly accounts for the context.</Text>
                                <Text style={styles.bodyText}> • Conceptualization.</Text>
                                <Text style={styles.bodyText}>
                                    • Translation of concepts into an executable design.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Consistent interaction and co-ordination for perfect on-site execution.
                                </Text>
                                <Text style={styles.bodyText}> • Site analysis with contextual references.</Text>
                                <Text style={styles.bodyText}>
                                    • Conversion of concept into executable designs through development of execution
                                    drawings.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Selection of contractors and other labour agencies.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Interaction and co-ordination with site managers and agencies to ensure work is
                                    executed as Per designs.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Ensuring quality of workmanship is maintained on site.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Selection of materials, fittings and hardware etc...
                                </Text>
                                <Text style={styles.bodyText}> • Selection of soft furnishings and art work.</Text>

                                <Text style={styles.bodyText}>• Site analysis that duly accounts for the context.</Text>
                                <Text style={styles.bodyText}> • Conceptualization.</Text>
                                <Text style={styles.bodyText}>
                                    • Translation of concepts into an executable design.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Consistent interaction and co-ordination for perfect on-site execution.
                                </Text>
                                <Text style={styles.bodyText}> • Site analysis with contextual references.</Text>
                                <Text style={styles.bodyText}>
                                    • Conversion of concept into executable designs through development of execution
                                    drawings.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Selection of contractors and other labour agencies.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Interaction and co-ordination with site managers and agencies to ensure work is
                                    executed as Per designs.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Ensuring quality of workmanship is maintained on site.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Selection of materials, fittings and hardware etc...
                                </Text>
                                <Text style={styles.bodyText}> • Selection of soft furnishings and art work.</Text>

                                <Text style={styles.bodyText}>• Site analysis that duly accounts for the context.</Text>
                                <Text style={styles.bodyText}> • Conceptualization.</Text>
                                <Text style={styles.bodyText}>
                                    • Translation of concepts into an executable design.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Consistent interaction and co-ordination for perfect on-site execution.
                                </Text>
                                <Text style={styles.bodyText}> • Site analysis with contextual references.</Text>
                                <Text style={styles.bodyText}>
                                    • Conversion of concept into executable designs through development of execution
                                    drawings.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Selection of contractors and other labour agencies.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Interaction and co-ordination with site managers and agencies to ensure work is
                                    executed as Per designs.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Ensuring quality of workmanship is maintained on site.
                                </Text>
                                <Text style={styles.bodyText}>
                                    • Selection of materials, fittings and hardware etc...
                                </Text>
                                <Text style={styles.bodyText}> • Selection of soft furnishings and art work.</Text>
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
                                        fontFamily: "Opensans",
                                        fontSize: 11,
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
