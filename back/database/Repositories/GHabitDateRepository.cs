﻿using Dapper;
using database.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace database.Repositories
{
    public class GHabitDateRepository(IOptions<DbConfig> dbConfig)
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

        //get-by-week
        public async Task<List<GHabitDate>> GetByWeek(int habitId)
        {
            try
            {
                string sql = @"SET DATEFIRST 1
                SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @habitId
                WHERE DATEPART(week, DateOf) = DATEPART(week, GETDATE())
                AND DATEPART(year, DateOf) = DATEPART(year, GETDATE());";

                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var ghabits = await _dbConnection.QueryAsync<GHabitDate>(sql, new { habitId});

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

        //get-by-month
        public async Task<List<GHabitDate>> GetByMonth(int habitId, int month, int year)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @habitId
                AND MONTH(DateOf) = @month
                AND YEAR(DateOf) = @year;";

                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var ghabits = await _dbConnection.QueryAsync<GHabitDate>(sql, new { habitId, month, year });

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
                WHERE DateOf = @dateof
                AND GHabitId = @gHabitId";

                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var test = await _dbConnection.QueryAsync<GHabitDate>(sql, new { dateof = gHabitDate.DateOf, gHabitId = gHabitDate.GHabitId });

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
            catch (Exception ex)
            {
                throw new Exception("err", ex);
            }
        }


        //delete
        public async Task Delete(int gHabitId, DateTime dateOf )
        {
            try
            {
                string sql = @"DELETE FROM bbetterSchema.GHabitDate
            WHERE GHabitId = @gHabitId
            AND DateOf = @dateOf";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                if (await _dbConnection.ExecuteAsync(sql, new { gHabitId, dateOf }) > 0) { return; }
            } catch(Exception ex)
            {
                throw new Exception("err", ex);
            }
            
        }

        //delete-by-ghabit
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