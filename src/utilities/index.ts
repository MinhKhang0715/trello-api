const mapOrder = (array: any, order: any, key: any): any => {
    array.sort((a: any, b: any) => order.indexOf(a[key]) - order.indexOf(b[key]));
    return array;
};

export { mapOrder }