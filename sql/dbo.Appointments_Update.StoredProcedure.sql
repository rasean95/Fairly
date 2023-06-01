USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[Appointments_Update]    Script Date: 4/13/2023 4:39:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Rasean Rhone
-- Create date: 04/10/2023
-- Description:	Updating status of appointment to removed
-- Code Reviewer: Dustin Polk
-- =============================================

ALTER proc [dbo].[Appointments_Update]
					@AppointmentTypeId int
					,@ClientId int
					,@TeamMemberId int
					,@Notes nvarchar(2000)
					,@LocationId int
					,@IsConfirmed bit
					,@AppointmentStart datetime2(7)
					,@AppointmentEnd datetime2(7)
					,@StatusTypesId int
					,@ModifiedBy int
					,@Id int

as



/*-----TEST CODE ----


	Declare @Id int = '8';

	Declare @AppointmentTypeId int = '4'
					,@ClientId int = '4'
					,@TeamMemberId int = '5'
					,@Notes nvarchar(2000) = 'Remember this appointment.'
					,@LocationId int = '4'
					,@IsConfirmed bit = '0'
					,@AppointmentStart datetime2(7) = '2023-04-14 12:00:00.0000000'
					,@AppointmentEnd datetime2(7) = '2023-04-14 14:00:00.0000000'
					,@StatusTypesId int = '2'
					,@ModifiedBy int = '4'

	Execute dbo.Appointments_Update
					@AppointmentTypeId
					,@ClientId
					,@TeamMemberId
					,@Notes
					,@LocationId
					,@IsConfirmed
					,@AppointmentStart
					,@AppointmentEnd
					,@StatusTypesId
					,@ModifiedBy
					,@Id


*/


BEGIN


	Declare @dateMod datetime2(7) = getutcdate();

	Update dbo.Appointments
		Set [AppointmentTypeId] = @AppointmentTypeId
			,[ClientId] = @ClientId
			,[TeamMemberId] = @TeamMemberId
			,[Notes] = @Notes
			,[LocationId] = @LocationId
			,[IsConfirmed] = @IsConfirmed
			,[AppointmentStart] = @AppointmentStart
			,[AppointmentEnd] = @AppointmentEnd
			,[StatusTypesId] = @StatusTypesId
			,[DateModified] = @dateMod
			,[ModifiedBy] = @ModifiedBy

	Where Id = @Id


END
GO
