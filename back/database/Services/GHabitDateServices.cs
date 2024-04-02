using Dapper;
using database.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace database.Services
{
    public class GHabitDateServices(IOptions<DbConfig> dbConfig)
    {
        //get-date
        public async Task<GHabitDate> GetById(int gHabitDateId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitDateId = @GHabitDateId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var ghabit = await _dbConnection.QuerySingleAsync<GHabitDate>(sql, new { gHabitDateId });
                return ghabit;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get GHabitDate", ex);
            }
        }

        //get-dates
        public async Task<List<GHabitDate>> GetByHabitId(int habitId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @habitId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var ghabits = await _dbConnection.QueryAsync<GHabitDate>(sql, new { habitId });

                if (ghabits.Count() == 0)
                {
                    return new List<GHabitDate>();
                }

                var result = ghabits.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get GHabit Dates", ex);
            }
        }

        //create
        public async Task<bool> Add(GHabitDate gHabitDate)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE (DateOf = @dateof)";

                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var test = await _dbConnection.QueryAsync<GHabitDate>(sql, new { dateof = gHabitDate.DateOf });

                if (test.Count() > 0) { return false; }

                sql = @"INSERT INTO bbetterSchema.GHabitDate
                ([GHabitId],[DateOf]) 
                VALUES (@gHabitId, @dateOf)";

                return await _dbConnection.ExecuteAsync(sql, new
                {
                    gHabitId = gHabitDate.GHabitId,
                    dateOf = gHabitDate.DateOf,
                }) > 0;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }


        //delete
        public async Task Delete(int gHabitDateId)
        {
            string sql = @"DELETE FROM bbetterSchema.GHabitDate
            WHERE GHabitDateId = @gHabitDateId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { gHabitDateId }) > 0) { return; }

            throw new Exception("Failed to Delete GHabitDate");
        }

        //delete-by-bhabit
        public async Task DeleteMany(int gHabitId)
        {
            string sql = @"DELETE FROM bbetterSchema.GHabitDate
            WHERE GHabitId = @gHabitId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { gHabitId }) > 0) { return; }

            throw new Exception("Failed to Delete GHabitDates");
        }
    }
}
