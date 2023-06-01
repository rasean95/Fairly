USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[Appointments_Select_ByClientId]    Script Date: 4/18/2023 11:35:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Rasean Rhone
-- Create date: 04/11/2023
-- Description:	Select appointment by clientId.
-- Code Reviewer: Dustin Polk
-- =============================================


ALTER proc [dbo].[Appointments_Select_ByClientId]
						@PageIndex int
						,@PageSize int
						,@ClientId int


as


/* -----Test Code --------


	Declare @PageIndex int = 0
			,@PageSize int = 5
			,@ClientId int = 6


	Execute [dbo].[Appointments_Select_ByClientId]
							@PageIndex
							,@PageSize
							,@ClientId



*/



BEGIN


	Declare @offset int = @PageIndex * @PageSize



	Select app.Id as ApptId
			,at.Id as ApptTypeId
			,at.Name as ApptType
			,st.Id as ApptStatusId
			,st.Name as ApptStatus
			,us.Id as ClientId
			,us.FirstName
			,us.LastName
			,us.Mi 
			,us.Email
			,us.AvatarUrl
			,app.IsConfirmed
			,tm.UserId as TeamMemberId
			,users.FirstName
			,users.LastName
			,users.Mi
			,users.Email
			,users.AvatarUrl
			,app.Notes
			,loc.Id as LocationId
			,loc.LineOne
			,loc.LineTwo
			,loc.City
			,loc.Zip
			,app.AppointmentStart
			,app.AppointmentEnd
			,app.DateCreated
			,app.DateModified
			,u.Id
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,mu.Id
			,mu.FirstName
			,mu.LastName
			,mu.Mi
			,mu.AvatarUrl
			,TotalCount = Count(1)Over()


	From dbo.Appointments as app inner join dbo.Users as us
			on app.ClientId = us.Id
						inner join dbo.Users as u
			on app.CreatedBy = u.Id
						inner join dbo.Users as mu
			on app.ModifiedBy = mu.Id
						inner join dbo.Locations as loc
			on loc.Id = app.LocationId
						inner join dbo.States as s
			on s.Id = loc.StateId
						inner join dbo.StatusTypes as st
			on app.StatusTypesId = st.Id
						inner join dbo.AppointmentTypes as at
			on at.Id = app.AppointmentTypeId
						inner join dbo.TeamMembers as tm
			on tm.UserId = app.TeamMemberId
						inner join dbo.Users as users
			on users.Id = tm.UserId
						inner join dbo.OrganizationLocations as org
			on org.LocationId = loc.Id


	Where app.ClientId = @ClientId AND NOT app.StatusTypesId = 5


	Order by app.AppointmentStart DESC


	OFFSET @offset Rows


	Fetch Next @PageSize Rows ONLY


END
GO
