﻿USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[Appointments_Insert]    Script Date: 4/13/2023 4:39:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	Rasean Rhone
-- Create date: 04/10/2023
-- Description:	Adding appointment.
-- Code Reviewer: Dustin Polk
-- =============================================

ALTER proc [dbo].[Appointments_Insert]
					@AppointmentTypeId int
					,@ClientId int
					,@TeamMemberId int
					,@Notes nvarchar(2000)
					,@LocationId int
					,@IsConfirmed bit
					,@AppointmentStart datetime2(7)
					,@AppointmentEnd datetime2(7)
					,@StatusTypesId int
					,@CreatedBy int
					,@ModifiedBy int
					,@Id int OUTPUT
			

as

/*----Test Code----


	Declare @Id int = '0';

	Declare @AppointmentTypeId int = '4'
					,@ClientId int = '4'
					,@TeamMemberId int = '5'
					,@Notes nvarchar(2000) = 'Remember appointment details.'
					,@LocationId int = '4'
					,@IsConfirmed bit = '1'
					,@AppointmentStart datetime2(7) = '2023-04-14 12:00:00.0000000'
					,@AppointmentEnd datetime2(7) = '2023-04-14 14:00:00.0000000'
					,@StatusTypesId int = '2'
					,@CreatedBy int = '4'
					,@ModifiedBy int = '4'

	Execute dbo.Appointments_Insert
					@AppointmentTypeId
					,@ClientId
					,@TeamMmeberid
					,@Notes
					,@LocationId
					,@IsConfirmed
					,@AppointmentStart
					,@AppointmentEnd
					,@StatusTypesId
					,@CreatedBy
					,@ModifiedBy
					,@Id OUTPUT



*/

BEGIN


	INSERT INTO dbo.Appointments
				([AppointmentTypeId]
				,[ClientId]
				,[TeamMemberId]
				,[Notes]
				,[LocationId]
				,[IsConfirmed]
				,[AppointmentStart]
				,[AppointmentEnd]
				,[StatusTypesId]
				,[CreatedBy]
				,[ModifiedBy])


		VALUES 
				(@AppointmentTypeId
				,@ClientId
				,@TeamMemberId
				,@Notes
				,@LocationId
				,@IsConfirmed
				,@AppointmentStart
				,@AppointmentEnd
				,@StatusTypesId
				,@CreatedBy
				,@ModifiedBy)

		SET @Id = SCOPE_IDENTITY();



END

GO
