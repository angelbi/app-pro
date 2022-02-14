import axios from 'axios';

const mockBaseApiUrl = '/mock/api';
const baseApiUrl = '/api';
export default class DashboardService {
  public findProjects(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${mockBaseApiUrl}/workplace_projects`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findActivity(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${mockBaseApiUrl}/workplace_activity`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findTeams(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${mockBaseApiUrl}/workplace_teams`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findRadar(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${mockBaseApiUrl}/workplace_radar`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getLogInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/sys-logs/stats`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getVisitInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/sys-logs/visit-info`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
