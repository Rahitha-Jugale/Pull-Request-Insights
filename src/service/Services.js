import instance from '../service/AxioxInterceptor';

export function getPrDataByBranchName(data){
    return instance.post("getPrDataByBranchName", data);
}

export function getPrDataByAuthor(data){
    return instance.post("getPrDataByAuthor", data);
}

export function getAddedLineCount(data){
    return instance.post("getAddedLineCountsByBranch", data);
}