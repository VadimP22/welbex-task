import { useState } from "react";
import { AppTableHeaderItem } from "./AppTableHeaderItem";

export function AppTableHeader(props: any) {


    function invertSortOrder() {
        props.setIsSortOrderIncrease(!props.isSortOrderIncrease)
    }

    return (
        <thead>
            <tr>
                <AppTableHeaderItem isSortOrderIncrease={props.isSortOrderIncrease} currentSortKey={props.sortColumn} onClick={(key: any) => {props.setSortColumn(key); invertSortOrder()}} keyProp="date" roundedTopLeft>Дата</AppTableHeaderItem>
                <AppTableHeaderItem isSortOrderIncrease={props.isSortOrderIncrease} currentSortKey={props.sortColumn} onClick={(key: any) => {props.setSortColumn(key); invertSortOrder()}} keyProp="name">Название</AppTableHeaderItem>
                <AppTableHeaderItem isSortOrderIncrease={props.isSortOrderIncrease} currentSortKey={props.sortColumn} onClick={(key: any) => {props.setSortColumn(key); invertSortOrder()}} keyProp="count">Количество</AppTableHeaderItem>
                <AppTableHeaderItem isSortOrderIncrease={props.isSortOrderIncrease} currentSortKey={props.sortColumn} onClick={(key: any) => {props.setSortColumn(key); invertSortOrder()}} keyProp="distance" roundedTopRight>Расстояние</AppTableHeaderItem>
            </tr>
        </thead>
    )
}