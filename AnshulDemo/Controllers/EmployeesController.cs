using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnshulDemo.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AnshulDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        public EmployeeDbContext _context = null;
        public EmployeesController(EmployeeDbContext employeeDbContext)
        {
            _context = employeeDbContext;
        }
        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<List<Employee>> Get()
        {
            return await _context.Employees.OrderBy(emp => emp.LastName).ToListAsync();
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            var empObj = _context.Employees.Where(emp => emp.Id == id).FirstOrDefault();
            return empObj;
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public bool Post([FromBody] Employee employee)
        {
            _context.Add(employee);
            return 0 < _context.SaveChanges();
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Employee employee)
        {
            _context.Update(employee);
            return 0 < _context.SaveChanges();
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            Employee emp = _context.Employees.Find(id);
            _context.Employees.Remove(emp);
            return 0 < _context.SaveChanges();
        }
    }
}
