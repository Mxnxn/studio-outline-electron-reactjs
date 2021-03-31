import React, { Fragment, useEffect, useState } from "react";
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

const OfferLetter = ({ loading, state }) => {
    const styles = StyleSheet.create({
        page: {
            display: "flex",
            flexDirection: "column",
            padding: 35,
        },
        header: {
            height: 80,
            width: "100%",
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
        righta: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            marginTop: 20,
            width: "auto",
        },
        bodyText: {
            fontFamily: "Nunito",
            fontSize: 10,
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
            width: 350,
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
    });

    return (
        loading && (
            <Fragment>
                <PDFViewer className="pop" style={{ height: "100%", width: "100%" }}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.header} fixed>
                                <View style={styles.righta}>
                                    <Text style={styles.heading}>Studio Outline</Text>
                                    <Text style={styles.subHead}>Interior Design – Architecture - Planning</Text>
                                </View>
                                <View style={styles.lefta}>
                                    <Text style={styles.ntext}>Address : 202, Sai shivam flats, 6, Shriniketan</Text>
                                    <Text style={styles.ntext}>society, Alkapuri, Vadodara. 390007.</Text>
                                    <Text style={styles.ntext}>Contact Number : +91-8401527637</Text>
                                    <Text style={styles.ntext}>Email: info@studiooutline.in</Text>
                                    <Text style={styles.ntext}>URL: www.studiooutline.in</Text>
                                </View>
                            </View>
                            <View style={styles.letterName}>
                                <Text style={styles.letterNameText}>OFFER LETTER</Text>
                            </View>
                            <View style={styles.bodyView}>
                                <Text style={styles.bodyText}>Dear {state.name},</Text>
                                <Text style={styles.bodyText}>
                                    We are pleased to offer you a position of Lead developer for Studio Outline and your
                                    anticipated date of joining is on or before {state.date}.
                                </Text>
                                <Text style={styles.bodyText}>Other terms of your offer are as under:</Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Personal Perticular:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    You here by confirm that the personal and other information furnished by you is
                                    current and accurate. You will keep Studio Outline informed of your residence
                                    address, your family status or any other information provided by you.
                                </Text>
                                <Text style={styles.bodyText}>
                                    If at any time, Studio Outline at its sole discretion believes, there is any
                                    discrepancy or inaccuracy in or with respect to any information furnished by you or
                                    in behalf, including any documents or certificate provided as proof of your
                                    qualification and experience, or if you fail to co operate with Studio Outline/its
                                    agent in conducting any verification/ background and in any reference check, Studio
                                    Outline may, at its sole discretion, elect to terminate or suspended your employment
                                    immediately
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Duties:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    The roles, duties & responsibilities appropriate to your designation or employment,
                                    will be specified by Studio Outline from time to time. Studio Outline may at any
                                    time, at its sole discretion upon notice to you, alter or otherwise modify these
                                    roles, duties & responsibilities
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Probation Period:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    You shall initially be on probation for a period of {state.workingDays} working days
                                    from the date of joining in Studio Outline. Studio Outline may, at its sole
                                    discretion, at any time extend this period on probation upon notice to you. Only on
                                    successful completion of probation and review thereof, you will be provided of
                                    confirmation letter by Studio Outline.
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Termination & separation:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    Studio Outline may terminate your employment immediately, with or without notice or
                                    any payment in lieu of salary on the occurrence of:-
                                </Text>
                                <Text style={styles.bodyText}>
                                    1) Non performance of duties, roles & responsibilities assigned to you.
                                </Text>
                                <Text style={styles.bodyText}>
                                    2) Unauthorized absence, disclosure/misuse of Studio Outline’s confidential
                                    information, work product including documents, drawings either in hard or soft copy.
                                </Text>
                                <Text style={styles.bodyText}>
                                    3) Resignation without prior notice or resignation with immediate effect, Studio
                                    Outline not liable to pay any working or last month salary.
                                </Text>
                                <Text style={styles.bodyText}>
                                    4) Resignation during probation period without notice or resignation with immediate
                                    effect, Studio Outline not liable to pay any working or last month salary with any
                                    experience certification.
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Leave policy:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    You will not be eligible for any paid leave during the probation period but unpaid
                                    leave to be considered only if 2 days prior informed by email or in written. Studio
                                    Outline leaves policy for you may be modified by Studio Outline at any time, at its
                                    sole discretion, upon notice you.
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Access information:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    Unauthorized access to Studio Outline proprietary or any confidential (drawings and
                                    documentations), or any attempt to do is strictly prohibited and shall result with
                                    immediate termination of your employment and legal action against you.
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Restriction to personal use:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    Use of Studio Outline resources for personal use is strictly prohibited. This
                                    includes usage of computer resources, information, internal service, assets and
                                    working time of Studio Outline for personal use. You will under no circumstances
                                    carry any work home unless specifically approved by Studio Outline/ authorized
                                    person. Any usage of drawings, documents or personal information for personal use
                                    will result in an immediate termination of your employment without notice or legal
                                    action against you. You may or may not, at the sole discretion of Studio Outline, be
                                    required to reimburse Studio Outline for any lossed incurred on account of personal
                                    usage of Studio Outline personal information & resources.
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Salary and other incentives:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    During the probation period of {state.workingDays} working days your salary will be
                                    paid by Studio Outline is {state.wage}/- (Rupee Six thousand five hundred only)
                                    along with the petrol allowance for the site visit or other work related to office.
                                    Studio Outline, at its sole discretion upon notice to you, alters or otherwise
                                    modifies these salary and incentives.
                                </Text>
                                <View style={styles.bodyCatView}>
                                    <Text style={styles.bodyCat}>Office hours:</Text>
                                </View>
                                <Text style={styles.bodyText}>
                                    Office hours are strictly from 10.00 A.M. to 7.00 P.M. & coming late any leaving
                                    early without any valid reason, Studio Outline, at its sole discretion upon notice
                                    to you, considered in half day and provide salary according to half day. During the
                                    workload period you will required to work till late and Studio Outline, at its sole
                                    discretion upon consider it during the appraisal
                                </Text>
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.bodyText}>
                                    For, Studio Outline, I have read, understood and agree to the terms and conditions
                                    as set forth in these terms of employment. My acceptance is as of the day and year
                                    written below.
                                </Text>
                                <View style={styles.footerLeft}>
                                    <Text style={styles.bodyText}>Manan Soni</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "flex-start",
                                    fontSize: 10,
                                    fontFamily: "Nunito",
                                }}
                            >
                                <Text>Trupesh Purohit</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Fragment>
        )
    );
};

export default OfferLetter;
