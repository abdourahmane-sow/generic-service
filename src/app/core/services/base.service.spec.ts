import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { TestService } from 'src/app/tests/mocks/service/test.service';
import { IMember } from 'src/app/tests/mocks/interface/IMember';
import { environment } from 'src/environments/environment.development';
import { allData, data1 } from 'src/app/tests/mocks/data/data.mock';

describe('Service: Base', () => {
  let service: TestService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(TestService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=> {
    httpController.verify();
  })

  it('should be create', ()=> {
      expect(service).toBeTruthy();
  })

  it('Should make a get request and return an array', ()=> {
    service.getAll().subscribe((response:IMember[])=> {
      expect(response).toEqual(allData);
    })
    const request = httpController.expectOne({
      method:'GET',
      url: `${environment.api.baseUrl}/members`
    })
    request.flush(allData)

  })

  it ('Shoud make a post request and return an element', ()=> {
    const newMember:IMember = {id:89,age:79,name:'Kouly'}
    service.save(newMember).subscribe((response:IMember)=> {
      expect(response).toEqual(newMember);
    })

    const request = httpController.expectOne({
      method:'POST',
      url: `${environment.api.baseUrl}/members`
    })
    request.flush(newMember )
  })

  it ('Should make a post request and return the backend return a 500', ()=> {
    let result: any
    const newMember:IMember = {id:89,age:79,name:'Kouly'}
    service.save(newMember).subscribe((response:IMember)=> {
      result = response
    })

    const request = httpController.expectOne({
      method:'POST',
      url: `${environment.api.baseUrl}/members`
    })

    request.error(new ProgressEvent('This member already exists'),{
      status: 500, statusText: 'Server error'
    })

    expect(result.status).toEqual(500);
    expect(result.statusText).toEqual('Server error');
    expect(result.message).toEqual('Http failure response for http://localhost:3000/members: 500 Server error');
  })

  it ('Should make a delete request and return the deleted element', ()=> {
    service.delete(data1.id).subscribe((response:IMember)=> {
      expect(response).toBe(data1);
    })

    const request = httpController.expectOne({
      method:'DELETE',
      url: `${environment.api.baseUrl}/members/${data1.id}`
    })
    request.flush(data1)
  })

  it('Should make a delete request and return the backend return a 404', ()=> {
    let result: any;
    service.delete(99).subscribe((response:IMember)=> {
      result = response
    })

    const request = httpController.expectOne({
      method:'DELETE',
      url: `${environment.api.baseUrl}/members/${99}`
    })

    request.error(new ProgressEvent('Id no exist'),{
      status: 404, statusText: 'Not found'
    })

    expect(result.status).toEqual(404);
    expect(result.statusText).toEqual('Not found');
    expect(result.message).toEqual('Http failure response for http://localhost:3000/members/99: 404 Not found');
  })

});

